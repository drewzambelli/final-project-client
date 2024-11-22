/*=========================================================================
EditCampusContainer.js

Custom container for EditCampustView. Mostly copied from the editstudent
files i wrote. Called from CampusView.
==========================================================================*/
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
 
import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk, checkCampusNameExistsThunk } from '../../store/thunks';

class EditCampusContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        name: "",
        address: "",
        description: "",
        campusPhoto: "",
        redirect: false, 
        redirectId: null,
        errors: {},
        };
    }

    async componentDidMount() {
        const campusId = this.props.match.params.id; 
        await this.props.fetchCampus(campusId);  // Don't mess with this line. Let's a fetch complete
        const campus = this.props.campus; 
        if (campus) {
            //console.log("in if campus");
            //console.log("campus: ", campus)
            this.setState({
                name: campus.name || "",
                address: campus.address || "",
                description: campus.description || "",
                campusPhoto: campus.campusPhoto || "",
            });
        }
    }

    // Grab input data
    handleChange = event => {
        this.setState({
        [event.target.name]: event.target.value,
        errors: { ...this.state.errors, [event.target.name]: "" }, //handles clearing errors
        });
    };

      //Using this to call new check campus thunk
    checkCampusNameExists = async (name) => {
        const campusExists = await this.props.checkCampusNameExists(name);
        return campusExists;
    };

// When user clicks:
handleSubmit = async event => {
    event.preventDefault();
     
    // Validate inputs so user can't leave blank fields
     const errors = {};
     if (!this.state.name.trim()) errors.name = "Campus name is required.";
     if (!this.state.address.trim()) errors.address = "Address is required.";
     if (!this.state.description.trim()) errors.description = "Description is required.";


    // I'm checking here to see if the campus name already exists - i don't want
    //people entering 2 of the same name
    //the next line is a special declaration for the edit page only because i was 
    //having a problem when a user tried to edit an existing program - my name check code
    //was firing and preventing any updates to the campus because the code thought the
    //campus already existed
    const campusExists = this.state.name !== this.props.campus.name && await this.checkCampusNameExists(this.state.name);
    if (campusExists) {
      errors.name = `The campus name '${this.state.name}' is already registered to another campus. Please modify your campus name.`;
    }

    //Check profilePhoto completed
    const updateCampusPhoto = this.state.campusPhoto.trim() === "" ? "/blankcampus.jpg" : this.state.campusPhoto;
    
    // Validate campus profile shot URL here - I was getting strange behaviour using errors above
    if (this.state.campusPhoto.trim()) {
        try {
            const response = await fetch(this.state.campusPhoto.trim(), { method: 'HEAD' });
            if (!response.ok) {
                errors.campusPhoto = "The provided campus photo URL is invalid.";
            }
        } catch (err) {
            errors.campusPhoto = "The provided campus photo URL is invalid.";
        }
    }

    // If there are errors, stop the user from submitting
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    // Prepare updated campus data
    const updatedCampus = {
        id: this.props.match.params.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        campusPhoto: updateCampusPhoto,
        };
        
        // Dispatch the edit action
        await this.props.editCampus(updatedCampus);
        
        // Redirect to the updated campus's page
        this.setState({
        redirect: true,
        redirectId: updatedCampus.id,
        });
    };
    
    render() {
        // Redirect to the updated campus's page after submit
        if (this.state.redirect) {
        return <Redirect to={`/campus/${this.state.redirectId}`} />;
        }

        // Display the input form via the corresponding View component
        return (
        <div>
            <Header />
            <EditCampusView
            campus={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors} // Pass errors
            />
        </div>
        );
    }
    }

    const mapStateToProps = (state) => ({
        campus: state.campus,  // Ensure the campus data is in the state
    });

    // Map dispatch functions to props
    const mapDispatch = (dispatch) => {
        return {
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        checkCampusNameExists: (name) => dispatch(checkCampusNameExistsThunk(name)),
        };
    };

export default connect(mapStateToProps, mapDispatch)(EditCampusContainer);
/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk, checkCampusNameExistsThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      address: "", 
      description: "",
      campusPhoto: "",
      redirect: false, 
      redirectId: null,
      errors: {}, //validation field stuff
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: { ...this.state.errors, [event.target.name]: "" }, //handles clearing errors
    });
  }

  //Using this to call new check campus thunk
  checkCampusNameExists = async (name) => {
    const campusExists = await this.props.checkCampusNameExists(name);
    return campusExists;
  };

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    // Validate inputs
     const errors = {};
     if (!this.state.name.trim()) errors.name = "Campus name is required.";
     if (!this.state.address.trim()) errors.address = "Address is required.";
     if (!this.state.description.trim()) errors.description = "Description is required.";
     
    // I'm checking here to see if the campus name already exists - i don't want
    //people entering 2 of the same name
    const campusExists = await this.checkCampusNameExists(this.state.name);
    if (campusExists) {
      errors.name = `The campus name '${this.state.name}' is already registered to another campus. Please modify your campus name.`;
    }

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

    //const campusToSave = this.state.campusPhoto.trim() || "/blankcampus.jpg";
    const campusToSave = this.state.campusPhoto.trim() || "/blankcampus.jpg";
    
    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        campusPhoto: campusToSave,
        //campusId: this.state.campusId
    };

    
    // Add new campus in back-end database
    let newCampus = await this.props.addCampus(campus);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      name: "", 
      address: "", 
      description: "", 
      campusPhoto: "",
      redirect: true, 
      redirectId: newCampus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewCampusView
          handleChange = {this.handleChange}    
          handleSubmit={this.handleSubmit}      
          errors={this.state.errors} //pass errors
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
        checkCampusNameExists: (name) => dispatch(checkCampusNameExistsThunk(name)),
    })
}

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewCampusContainer);
 
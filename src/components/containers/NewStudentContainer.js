/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk, checkEmailExistsThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    const { state } = this.props.location || {};
    this.state = {
      firstname: "", 
      lastname: "", 
      age: "",
      yearInSchool: "",
      email: "",
      address: "",
      gpa: "",
      campusId: state ? state.campusId : "", //in case called from campus specific page
      profilePhoto: "",
      redirect: false, 
      redirectId: null,
      errors: {}
    };
  }

    // Get all campuses data from back-end database
    componentDidMount() {
      console.log(this.props);
      this.props.fetchAllCampuses();
    }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

    // Check if the email already exists
    checkEmailExists = async (email) => {
      const emailExists = await this.props.checkEmailExists(email);
      return emailExists;
    }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    const { firstname, lastname, age, yearInSchool, email, address, gpa, campusId, profilePhoto } = this.state;
    let errors = {};

    // // Validate GPA
    // if (GPA < 0 || GPA > 4) {
    //   errors.GPA = "GPA must be between 0 and 4.";
    // }

    // Make sure user didn't leave anything blank
    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (!age || isNaN(age) || age <= 0) errors.age = "Please enter a valid age.";
    if (!yearInSchool) errors.yearInSchool = "Year in school is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email address.";
    if (!address) errors.address = "Address is required.";
    if (!campusId) errors.campusId = "Please select a campus.";
    if (!gpa || isNaN(gpa) || gpa < 0 || gpa > 4) errors.gpa = "Please enter a valid GPA between 0 and 4.";

     // Need to do this here because handling it once it gets
     //to the backend is way more complicated
     const emailExists = await this.checkEmailExists(email);
     if (emailExists) {
       errors.email = "This email is already registered.";
     }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    const photoToSave = profilePhoto || "/blankprofile.jpg";

    let student = {
      firstname,
      lastname,
      age,
      yearInSchool,
      email,
      address,
      gpa,
      campusId,
      profilePhoto: photoToSave,
    };
  
    console.log("right before error occurs");
    console.log("student data being sent:", student)
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    console.log("right after error occurs");
    console.log(newStudent)

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      age: "",
      yearInSchool: "",
      email: "",
      address: "",
      gpa: "",
      campusId: "", 
      profilePhoto: "",
      redirect: true, 
      redirectId: newStudent.id,
      errors: {} //need to clear errors here otherwise errors out
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}   
          errors={this.state.errors} //error messages for field validation
          allCampuses={this.props.allCampuses} //dropdown box campuses
          selectedCampusId={this.state.campusId} //if add student called from campus specific page, i use this to pre-populate campus selection menu
        />
      </div>   
             
    );
    
  }
}

const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,  //dropdown menu - copied over from allcampusescontainer
  };
};  

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
        checkEmailExists: (email) => dispatch(checkEmailExistsThunk(email))
    })
}

//dropdown menu - copied from allcampusescontainer
NewStudentContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
};

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentContainer);
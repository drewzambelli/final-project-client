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
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      age: "",
      yearInSchool: "",
      email: "",
      address: "",
      campusId: "",
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

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    const { firstname, lastname, age, yearInSchool, email, address, campusId } = this.state;
    let errors = {};

    // Make sure user didn't leave anything blank
    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (!age || isNaN(age) || age <= 0) errors.age = "Please enter a valid age.";
    if (!yearInSchool) errors.yearInSchool = "Year in school is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email address.";
    if (!address) errors.address = "Address is required.";
    if (!campusId) errors.campusId = "Please select a campus.";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
  }
    let student = {
      firstname,
      lastname,
      age,
      yearInSchool,
      email,
      address,
      campusId
    };
  
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      age: "",
      yearInSchool: "",
      email: "",
      address: "",
      campusId: "", 
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
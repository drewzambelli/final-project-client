/*=========================================================================
EditStudentContainer.js

Custom container for EditStudentView. Mostly copied from starter code but 
with some key changes to load existing student data once user clicks edit
on an existing student. Also, needed allcampuses code copied over too as
that populates my dropdown menu
==========================================================================*/
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      age: "",
      yearInSchool: "",
      email: "",
      address: "",
      gpa: "",
      campusId: "",
      errors: {},
      isLoading: true,
    };
  }

  // Fetch student data on mount
  async componentDidMount() {
    const studentId = this.props.match.params.id;
    await this.props.fetchStudent(studentId);
    
    const { firstname, lastname, age, yearInSchool, email, address, gpa, campusId } = this.props.student;

    console.log(this.props.student);
    this.setState({
      firstname,
      lastname,
      age,
      yearInSchool,
      email,
      address,
      gpa,
      campusId,
      isLoading: false,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { firstname, lastname, age, yearInSchool, email, address, gpa, campusId } = this.state;
    let errors = {};

    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (!age || isNaN(age) || age <= 0) errors.age = "Please enter a valid age.";
    if (!yearInSchool) errors.yearInSchool = "Year in school is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email address.";
    if (!address) errors.address = "Address is required.";
    if (!campusId) errors.campusId = "Please select a campus.";
    if (!gpa || isNaN(gpa) || gpa < 0 || gpa > 4) errors.gpa = "Please enter a valid GPA between 0 and 4.";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    //Drew! Do not mess with this. This was your problem, you weren't passing ID of student - here you
    //are combing student ID and other data associated with the student and passing it to the THUNK.
    const studentId = this.props.match.params.id;
    const student = { firstname, lastname, age, yearInSchool, email, address, gpa, campusId };
    const studentInfo = {...student, id: studentId};
    await this.props.editStudent(studentInfo);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.isLoading) {
        return <div>Loading...</div>;
      }
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.props.match.params.id}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          initialData={this.state}
          allCampuses={this.props.allCampuses}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  allCampuses: state.allCampuses,
  student: state.student,
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student)),
});

EditStudentContainer.propTypes = {
  fetchStudent: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
  allCampuses: PropTypes.array.isRequired,
  student: PropTypes.object.isRequired,
};

export default connect(mapState, mapDispatch)(EditStudentContainer);

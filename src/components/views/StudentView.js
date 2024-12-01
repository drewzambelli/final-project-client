/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import React from 'react';
import {Link, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import '../../styles/globalStyles.css';

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  const history = useHistory();

  const handleDelete = () => {
    deleteStudent(student.id);
    history.push('/students');
  }

  // Render a single Student view 
  return (
    <div className = "single-students-container">
      <h1>{student.firstname + " " + student.lastname}</h1>
      <Link to={`/campus/${student.campus.id}`}>
      <h3>{student.campus.name}</h3>
      </Link>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Year:</strong> {student.yearInSchool}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Address:</strong> {student.address}</p>
      <p><strong>GPA:</strong> {student.gpa}</p>
      <p>Student ID Photo</p>
      <img src={student.profilePhoto}
      alt={`${student.firstname} ${student.lastname}`}
      style={{ width: '150px', height: '150px', objectFit: 'cover' }} //forces picture into smaller space
      />
      <br/>
      <br/>

      {/* Added Edit Button */}
      <Link to={`/editstudent/${student.id}`} style={{ marginRight: '10px' }}>
        <button>Edit Student</button>
      </Link>

      {/* delete button */}
      <button onClick={handleDelete}>Delete Student</button>
      <br/>
      <br/>
      <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
        Go Back
      </Button>      
    </div>
  );

};

StudentView.propTypes = {
  deleteStudent: PropTypes.func.isRequired,
};

export default StudentView;
 
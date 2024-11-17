/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <h4>Campus Code: {campus.id}</h4>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {/*List enrolled students */}
      <h2>Enrolled Students</h2>
      {campus.students && campus.students.length > 0 ? (
      campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })
      ) : (<p>No students currently enrolled at this campus.</p>)}
  {/*Calls new student view from campus specific page, passing campus name/id to prepopulate campus selection menu */}
  <Link to={{ pathname: "/newstudent", state: { campusId: campus.id, campusName: campus.name }}}>
    <button>Add Student to {campus.name}</button>
  </Link>
    </div>
  );
};

export default CampusView;
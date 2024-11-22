/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'; //go back button takes you back to previous page


// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  const history = useHistory(); //for Go Back button

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <h4>Campus Code: {campus.id}</h4>
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <p>Campus Profile Photo</p>
      <img src={campus.campusPhoto}
      alt={`${campus.name}`}
      style={{ width: '400px', height: '250px', objectFit: 'cover' }} //forces picture into smaller space
      />
      <br/>
      <br/>

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

  <br/>
  <br/>
  <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
    Go Back
  </Button>  
  
    </div>
  );
};

export default CampusView;
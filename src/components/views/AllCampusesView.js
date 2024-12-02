/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import '../../styles/globalStyles.css';
import { useState } from "react"; //using to alert usr why we can't delete
const AllCampusesView = (props) => {

  const [errorMessages, setErrorMessages] = useState({});
  //I'm using this to tell the user why they can't delete a campus - prior to this, if a student was
  //associated with a campus and you clicked the Delete Campus button, nothing happened which is correct.
  //However, that might be confusing for a user so I want to tell user why they can't - you can't delete
  //a campus that has student associated with it because a student can't be in the database without being
  //registered with a campus
  const handleDelete = (campus) => {
    if (campus.students.length > 0) {
      //using campus.id because if i don't, the error appears below all campus delete buttons
      //this way it has campus ID and knows where to appear
      setErrorMessages((prev) => ({
        ...prev,
        [campus.id]: `Cannot delete ${campus.name} while it has enrolled students.`,
      }));
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        [campus.id]: "", // This is where i clear the error for the campus
      }));
      props.deleteCampus(campus.id);
    }
  };

  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
    //if no campuses, need to give user ability to add campuses
    <div>
    <div>There are no campuses. Click the button below to add a campus.</div>
    <br/>
      <Link to = {'/newcampus'}>
        <button>Add the first campus!</button>
      </Link>
    </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div className = 'all-campuses-container'>
      <h1>-All Campuses-</h1>
      
      {props.allCampuses.map((campus) => (     
          <div key={campus.id} className = 'campus-card'>
            <Link to={`/campus/${campus.id}`}>
              <h2 className = "name-link">{campus.name}</h2>
            </Link>
            {/*<h4>campus id: {campus.id}</h4>*/}
            <p className = 'campus-address'>{campus.address}</p>
            <p className = 'campus-description'>{campus.description}</p>
            <img src={campus.campusPhoto}
            alt={`${campus.name}`}
            style={{ width: '400px', height: '250px', objectFit: 'cover' }} //forces picture into smaller space
            />
            <br/>
            {/*Adding a delete button here for each campus */}
            {/*<button onClick={() => props.deleteCampus(campus.id)}>Delete Campus</button>*/}
            <button onClick={() => handleDelete(campus)}>Delete Campus</button>
            {/*targetted error message using campus.id to prvent multiple error messages from appearing with all campuses */}
            {errorMessages[campus.id] && (<p style={{ color: "red" }}>{errorMessages[campus.id]}</p>)} 
            
          </div>
        
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;
 
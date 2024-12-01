/*=========================================================================
EditStudentView.js

Custom View EditStudentView. Child. Mostly copied from starter code but 
with some key changes to load existing student data once user clicks edit
on an existing student. Also, needed allcampuses code copied over too as
that populates my dropdown menu
==========================================================================*/
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/globalStyles.css';
import { useHistory } from 'react-router-dom'; //cancel button takes you back to previous page


// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, errors } = props;
  const classes = useStyles();
  const history = useHistory(); //cancel button to prev page
  const { firstname, lastname, age, yearInSchool, email, address, gpa, campusId, profilePhoto } = props.initialData;

  return (
    <div className = "edit-student-form">
      <h1>Edit Student</h1>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
              Edit Student Information
              <br />
              *All Fields Are Required*
            </Typography>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
            <input type="text" name="firstname" value={firstname} onChange={(e) => handleChange(e)} />
            {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
            <input type="text" name="lastname" value={lastname} onChange={(e) => handleChange(e)} />
            {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Age: </label>
            <input type="number" name="age" value={age} onChange={(e) => handleChange(e)} />
            {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Year: </label>
            <select name="yearInSchool" value={yearInSchool} onChange={(e) => handleChange(e)}>
              <option value="">Select a Year</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="5th+">5th Year or More</option>
            </select>
            {errors.yearInSchool && <p style={{ color: 'red' }}>{errors.yearInSchool}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
            <input type="email" name="email" value={email} onChange={(e) => handleChange(e)} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Address: </label>
            <input type="text" name="address" value={address} onChange={(e) => handleChange(e)} />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
            <br />
            <br />
 
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA: </label>
            <input type="number" step="0.01" name="gpa" value={gpa} onChange={(e) => handleChange(e)} />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus: </label>
            <select name="campusId" value={campusId} onChange={(e) => handleChange(e)}>
              <option value="">Select a Campus</option>
              {props.allCampuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
            {errors.campusId && <p style={{ color: 'red' }}>{errors.campusId}</p>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Profile Photo URL: </label>
            <input
              type="text"
              name="profilePhoto"
              value= {profilePhoto}
              onChange={(e) => handleChange(e)}
              placeholder="Enter the URL of the profile photo"
            />
            <br/>
            {/*allow user to preview picture - the absolute pathing for blankprofile is super important because i'm displaying the image based on what
            is in the URL field. If i don't have the first slash, nothing is displayed. */}
            <img src={profilePhoto.trim() === '' ? '/blankprofile.jpg' : profilePhoto} alt="Profile Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '10px' }} />
            {errors.profilePhoto && <p style={{ color: 'red' }}>{errors.profilePhoto}</p>}
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
            <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
                Cancel
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentView;

/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new campus page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/globalStyles.css';
import { useHistory } from 'react-router-dom'; //for cancel button to take user back

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
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
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const NewCampusView = (props) => {
  const {handleChange, handleSubmit, errors } = props;
  const classes = useStyles();
  const history = useHistory(); //used by cancel button

  // Render a New Campus view with an input form
  return (
    <div className = "add-campus-container">
      <h1>New Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Campus
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Campus Name: </label>
            <input type="text" name="name" onChange ={(e) => handleChange(e)} />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
            <input type="text" name="address" onChange={(e) => handleChange(e)} />
            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
            <br/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
            <input type="text" name="description" onChange ={(e) => handleChange(e)} />
            {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
            <br/>
            <br/>

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Photo URL: </label>
            <input
              type="text"
              name="campusPhoto"
              onChange={(e) => handleChange(e)}
              placeholder="Enter the URL of the campus photo"
            />
            {errors.campusPhoto && <p style={{ color: 'red' }}>{errors.campusPhoto}</p>}
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
              Cancel
            </Button>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default NewCampusView;
 
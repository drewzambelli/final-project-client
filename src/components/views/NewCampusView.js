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
      <h1>-New Campus-</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Campus
            </Typography>
          </div>
          <form style={{textAlign: 'left', width: "80%", margin: 'auto'}} onSubmit={(e) => handleSubmit(e)}>

            <div className="form-field">
              <label style= {{color:'#11153e', fontWeight: 'bold'}}>Campus Name: </label>
              <div className="input-container">
                <input type="text" name="name" onChange ={(e) => handleChange(e)} />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
            </div>

            <div className="form-field">
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
              <div className="input-container">
                <input type="text" name="address" onChange={(e) => handleChange(e)} />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </div>
            </div>

            <div className="form-field">
              <label style= {{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
              <div className="input-container">
                <textarea type="text" name="description" rows = "4" onChange ={(e) => handleChange(e)} />
                {errors.description && <p className="error-message">{errors.description}</p>}
              </div>
            </div>

            <div className="form-field">
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Photo URL: </label>
              <div className="input-container">
                <input
                  type="text"
                  name="campusPhoto"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter the URL of the campus photo"
                />
                {errors.campusPhoto && <p className="error-message">{errors.campusPhoto}</p>}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px'}}>
              <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
                Submit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </div>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default NewCampusView;
 
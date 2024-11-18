/*=========================================================================
EditCampusView.js

Custom View EditCampusView. Child.
==========================================================================*/
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
  
  const EditCampusView = (props) => {
    const { handleChange, handleSubmit, errors, campus } = props;
    const classes = useStyles();
    const history = useHistory(); //cancel button to prev page
    return (
        <div>
            <h1>Edit Campus</h1>
            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <div className={classes.formTitle}>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                fontFamily: "Courier, sans-serif",
                                fontSize: "20px",
                                color: "#11153e",
                            }}
                        >
                            Edit Campus Information
                            <br />
                            *All Fields Are Required*
                        </Typography>
                    </div>
                    <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                        <label style={{ color: "#11153e", fontWeight: "bold" }}>
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={campus.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                        <br />
                        <br />

                        <label style={{ color: "#11153e", fontWeight: "bold" }}>
                            Address:
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={campus.address}
                            onChange={handleChange}
                        />
                        {errors.address && (
                            <p style={{ color: "red" }}>{errors.address}</p>
                        )}
                        <br />
                        <br />

                        <label style={{ color: "#11153e", fontWeight: "bold" }}>
                            Description:
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={campus.description}
                            onChange={handleChange}
                        />
                        {errors.description && (
                            <p style={{ color: "red" }}>{errors.description}</p>
                        )}
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

export default EditCampusView;

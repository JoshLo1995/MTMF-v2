import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, getCurrentUser } from '../../../actions/authActions';
import { uploadTrack, getUserTracks, removeGarbage } from '../../../actions/trackActions';

import Canvas from '../../Canvas/Canvas';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class MembersPage extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            image_object: null,
            errors: {},
            trackName: ""
        }
    }

    // onSubmit, post process the track (track actions) and then save to a new track object to be saved in the db
    processAndSave = async (imgWidth, imgHeight) => {
        console.log("this is onSubmit");

        // GET
            // Get current user here
        const currentUser = this.props.getCurrentUser().payload.email; // Current user's email
            // Query db for currentUser and save the Tracks array
        let tracks = await this.props.getUserTracks(currentUser); // When printed now returns [] as expected
            // Upload track image to server that will be deleted after post processing
                // POST to server the image that is uploaded by the user

        const imageData = btoa(this.state.image_object);
        // console.log(imageData);
        let newJson = {
            "imageData": imageData, // Stored as a LARGE base64 string
            "imageWidth": imgWidth,
            "imageHeight": imgHeight, 
        }
  
        this.props.uploadTrack(newJson); // image stored as a base64 on mongo server

        // TODO
        // MODIFY uploaded track image
        this.props.removeGarbage(newJson); 
        // let imageData = this.state.image_object; // base64

        // Process the track image (this.state.image_object) (color mask out the non-track entities)
            // Remove corner numbers, names, pit buildings, pit road, etc (use google vision API to first remove unnecessary pixels)
            // Find the average track color so that the color mask does not remove RGBA values of avg val +- a tolerance
            
        // UPDATE
            // Create the new track data to be uploaded to the User's account
        const newTrack = {
            currentUser: currentUser,
            name: this.state.trackName,
            imageData: this.state.imageData, // set newState with the processed image, this is currently the uploaded image
            // GeneratedLine: 
        };

        // UPLOAD
            // Upload the track to the user's account
        // this.props.uploadTrack(newTrack);
    }

    onChange = e => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        );
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    updateImageObject(e) {
        const file  = e.target.files[0]; 
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({image_object: reader.result}, () => {
                // Retrieving image dimensions
                let img = new Image();
                img.onload = (img) => {
                    const image = img.path[0].src; //Stored as base64
                    const width = img.path[0].width;
                    const height = img.path[0].height;

                    // Sending pixel data to server
                    // // Create canvas, get context, 
                    // Convert base64 to Uint8ClampedARray
                    // Convert Uint8 to ImageData
                    // Draw Image Data to canvas
                    // const canvas = document.createElement('canvas');
                    // const context = canvas.getContext('2d');

                    // canvas.width = width; canvas.height = height;
                    // context.drawImage(img, canvas.width, canvas.height); // PROBLEM IS HERE
                    // // // We're gettin da imageData
                    // const data = context.getImageData(0, 0, canvas.width, canvas.height);

                    // console.log(data);

                    this.processAndSave(width, height);
        
                }
                img.src = this.state.image_object; // Needs to be of HTMLImageElement, SVGImageElement, HTMLCanvasElement, or ImageBitmap
                
            });
        };
    }

    render() {
        const { errors } = this.state;
        // console.log(this.state.image_object_details, " image object details ");
        return (
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CardContent>
                            <Typography variant="h4" color="textPrimary" component="h4">
                                Find the Racing Line
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12}>
                        {/* {this.state.image_object &&
                            <Canvas id = "canvas" uploadedImage = {this.state.image_object} width = {this.state.image_object.width} height = {this.state.image_object.height}></Canvas> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <form>
                                    <div className = "input-field col s12">
                                        <input
                                            onChange = {this.onChange}
                                            value = {this.state.trackName}
                                            error = {errors.name}
                                            id = "trackName"
                                            type = "text"
                                        />
                                        <label htmlFor = "trackName">Track Name</label>
                                    </div>
                                    <Button 
                                        variant="contained"
                                        component='label' // <-- Just add me!
                                        type = "submit"
                                        >
                                        Upload Image
                                        <input 
                                            accept="image/jpeg,image/png"
                                            onChange={(e) => this.updateImageObject(e)} 
                                            type="file" 
                                            style={{ display: 'none' }} 
                                        />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    onClick={this.onLogoutClick}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                    Logout
                                </button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

MembersPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadTrack: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    getUserTracks: PropTypes.func.isRequired,
    removeGarbage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { logoutUser, getCurrentUser, uploadTrack, getUserTracks, removeGarbage }
  )(MembersPage);


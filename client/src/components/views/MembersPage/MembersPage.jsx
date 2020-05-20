import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
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
            image_object_details: {},
            active_type: null
        }
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
            this.setState({image_object: reader.result, image_object_details: {}, active_type: null});
        };


    }

    render() {
        // console.log(this.state.image_object_details, " image object details ");
        return (
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CardContent>
                            <Typography variant="h4" color="textPrimary" component="h4">
                                Object Detection Tensorflow
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.image_object &&
                            <Canvas ref = "canvas" id = "canvas" uploadedImage = {this.state.image_object} width = {this.state.image_object.width} height = {this.state.image_object.height}></Canvas>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Button variant="contained"
                                    component='label' // <-- Just add me!
                                    >
                                    Upload Image
                                    <input accept="image/jpeg,image/png" onChange={(e) =>  this.updateImageObject(e)} type="file" style={{ display: 'none' }} />
                                </Button>
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
                            <Grid item >
                                {this.state.image_object && <Button onClick={() => this.processImageObject("imagenet")}variant="contained" color="primary">
                                    Get objects with ImageNet
                                </Button>}
                            </Grid>
                            <Grid item> 
                                {this.state.image_object && <Button onClick={() => this.processImageObject("coco-ssd")}variant="contained" color="secondary">
                                    Get objects with Coco SSD
                                </Button>}
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
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(MembersPage);


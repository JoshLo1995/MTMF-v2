import React from 'react';
import Canvas from '../../Canvas/Canvas';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';

// import {api} from '../utils/Api';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class MembersPage extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            image_object: null,
            image_object_details: {},
            active_type: null
        }
    }

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


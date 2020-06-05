const express = require("express");
const router = express.Router();
// import { uploadTrack } from '../../../actions/trackActions'; 

// Load input validation
const validateTrackUpload = require('../../validation/track');

// Load Track model
const Track = require("../../models/Track");
const User = require('../../models/User');

// Additional stuff for converting base64 data to Uint8ClampedArrauy
const Uint8ClampedArray = require('typedarray').Uint8ClampedArray;
const Buffer = require('buffer').Buffer;
global.Buffer = Buffer; // Very important?
const jpeg = require('jpeg-js');
const png = require('pngjs');
const Base64 = require('js-base64').Base64;

// Image manipulation package
const Jimp = require('jimp');


// @route GET api/tracks/removeGarbage
// @desc Retrieve the uploaded image from mongoDb and return it to the client
// @access Public
router.get('/removeGarbage/:garbageBegone', (req, res) => {
    let garbage = JSON.stringify(req.params.garbageBegone);
    console.log(garbage);

    // Delete from mongo after doing stuff for dev purposes
    Track.remove( { } ); // Passing an empty object removes all documents from a collection
    console.log('deleted all documents in tracks collection');
    res.end();
})


// @route POST api/tracks/uploadTrack
// @desc Post to db the name of the track and imageData as an RGBA array. tracks is a property of the user that the data can be pushed to
// @access Public
router.post("/uploadTrack/:imageData", async (req, res) => {
    // Validate uploaded image LOLJK skip this until after the bootcamp submission
    // const { errors, isValid } = validateTrackUpload(req.body);
    // // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    // const imageWidth = parseInt(JSON.stringify(req.body.imageWidth)); // String -> Num
    // const imageHeight = parseInt(JSON.stringify(req.body.imageHeight));
    // const imageData = JSON.stringify(req.body.imageData); // Taking the passed in image object and converting it into a JSON string, imageData is a LONG base64 string
    
    const base64Data = Base64.decode(req.body.imageData);
    const sliceFrom = 'data:image/jpeg:base64,'.length;
    const slicedData = base64Data.slice(sliceFrom, base64Data.length);

    const newTrack = new Track({
        imageData: slicedData,
    });

    console.log('END OF POST REQUEST: newTrack saved to db');
    newTrack.save(); // Now that the track is saved to the server, we can begin manipulation of the image

    res.end();



    // TODO after bootcamp is over
    // // Converts to a buffer object which is straight up binary
    // // const jpegData = Buffer.from(imageData, 'base64');
    // const jpegData = new Promise((res, rej) => {
    //     // Decode base64, slice prefix, convert to buffer, then decode buffer
    //     const base64Data = Base64.decode(req.body.imageData);
    //     const sliceFrom = 'data:image/jpeg:base64,'.length;
    //     const slicedData = base64Data.slice(sliceFrom, base64Data.length);
    //     const jpegData = Buffer.from(slicedData, 'base64'); 
    //     const rawImageData = jpeg.decode(jpegData); 
    //     console.log('raw image data!!', rawImageData, rawImageData.data.length + 'pixels');
    //     res(rawImageData); // when fulfilled, send buffer data to the .then
    // })
    // .then(async (rawImageData) => { // tempData is passed in succesfully as a buffer here
    //     let clampedArray = new Uint8ClampedArray(rawImageData.data.length); // array too large?
    //     // manually fill array
    //     for (let i = 0; i < rawImageData.data.length; i++) {
    //         clampedArray[i] = rawImageData.data[i];
    //     }
    //     console.log('clamped array', 'Done filling new data array');
    //     return (clampedArray);
    // })
    // .then((clampedArray) => {
    //     // create new track object, can confirm that clampedArray is ready at this point
    //     const newTrack = new Track({
    //         imageData: clampedArray, // it works now
    //     });
    
    //     // console.log('saving new track to db for processing', newTrack);
    //     newTrack.save(); // Cannot save to db because clampedArray is HUGE, exceeds mongodb max size of 16MB, screw it just save the base64 to the db
    // })
    // .catch(err => {
    //     // Handle failure
    //     // console.log(err);
    //     throw err;
    // });

    // THIS FUNCTION IS JUST TO UPLOAD THE IMAGE AS AN RGBA ARRAY STOP DOING MORE STUFF
});

// @route GET api/tracks/getUserTracks
// @desc Get the reference to the user's tracks array
// @access Public
router.get('/getUserTracks/:email', (req, res) => {
    // Find user by email
    User.findOne({email: req.params.email}).then(user => {
        // check if user exists
        if (user) {
            // Return tracks array
            res.send(user.tracks);
        } else {
            return res.status(400).json(errors); // Doesn't actually return any errors atm lol
        }
    });
    // Return null because if you get to this point, you're screwed
    return null;
})

// @route POST api/tracks/uploadLine
// @desc Post to db the racing line generated by A* as a base64 to overlay on top of the post-processed track image
// @access Public

// @route GET api/tracks/getImage
// @desc Get the post-processed track base64 and the A* line base64 for the client to overlay and display
// @access Public

module.exports = router;
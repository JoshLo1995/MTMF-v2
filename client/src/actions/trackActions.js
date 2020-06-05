import axios from 'axios';
import { GET_USER_TRACKS, SET_USER_TRACK, MODIFY_NEW_TRACK } from './types';

// Upload the uploaded track image to the server for
// trackImage is MASSIVE, need to think of another way to pass in the data, cannot use a GET method due to the fact that the image is not on the server yet
export const uploadTrack = (trackImage) => dispatch => {
    axios
        .post(`/api/tracks/uploadTrack/${trackImage}`, trackImage)  // trackImage is passed in as JSON
        .catch(err =>
            dispatch({
                type: SET_USER_TRACK,
                payload: err.response.data
            })
        )

}

// Called from MembersPage
// Current user's email gets passed in as a param
export const getUserTracks = (userData) => dispatch => {
    return axios
        .get(`/api/tracks/getUserTracks/${userData}`, userData)
        .then(response => {
            return response.data;
        })
        .catch(err => 
            dispatch({
                type: GET_USER_TRACKS,
                payload: err.response.data
            })
        )

}

// Called from MembersPage
// Manipulate individual pixels via;
// Using google cloud vision, remove any text that is seen
// Using a color mask, filter out any pixels that are not track pixels (MAKE SEPARATE FUNCTION)
export const removeGarbage = (garbageBegone) => dispatch => {
    // Get the image from mongoDB
    return axios
        .get(`/api/tracks/removeGarbage/${garbageBegone}`, garbageBegone)
        .catch(err => 
            dispatch({
                type: MODIFY_NEW_TRACK,
                payload: err.response.data
            })
        )
        // Convert the image from base64, to buffer, to uint8 (rgba) array
    
}

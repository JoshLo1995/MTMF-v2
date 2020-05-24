import axios from 'axios';
import { GET_USER_TRACKS, SET_USER_TRACK } from './types';

// Upload the uploaded track image to the server for
// trackImage is MASSIVE, need to think of another way to pass in the data, cannot use a GET method due to the fact that the image is not on the server yet
export const uploadTrack = (trackImage) => dispatch => {
    axios
        .post(`/api/tracks/uploadTrack/${trackImage}`) 
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


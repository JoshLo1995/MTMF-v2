// const Validator = require('validator');
// const isEmpty = require('is-empty');

// module.exports = validateTrackUpload = (data) => {
//     let errors = {};

//     // Convert empty field to empty string to use validator functions
//     data.name = !isEmpty(data.name)

//     // Name check
//     if (Validator.isEmpty(data.name)) {
//         errors.name = "Name field is required";
//     }

//     return {
//         errors,
//         isValid: isEmpty(errors)
//     }
// }
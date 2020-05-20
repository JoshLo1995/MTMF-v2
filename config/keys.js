const user = 'admin';
const pass = encodeURIComponent('MTMFLicker@31');


module.exports = {
    mongoURI: `mongodb://${user}:${pass}@ds051883.mlab.com:51883/heroku_jdkc438j`,
    secretOrKey: "Racecar"
  };
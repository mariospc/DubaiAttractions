const {
    getAllAttractions,
    getAttraction,
    updateAttraction    
} = require('./attractions');

const {
    signUp,
    logIn,
    logOut
} = require('./users');

module.exports = {
    getAllAttractions,
    getAttraction,
    updateAttraction,

    signUp,
    logIn,
    logOut
}
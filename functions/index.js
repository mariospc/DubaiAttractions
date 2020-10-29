const {
    listAttraction,
    getAttraction,
    updateAttraction    
} = require('./attractions');

const {
    signUp,
    logIn,
    logOut
} = require('./users');

module.exports = {
    listAttraction,
    getAttraction,
    updateAttraction,

    signUp,
    logIn,
    logOut
}
const signUp = async (req, res) => {
    const { db } = req.app.locals.share;

    const user = new Parse.User();
    user.set("username", req.body.username);
    user.set("password", req.body.password);
    user.set("email", req.body.email);

    try {
        await user.signUp();
        res.status(200).json({message:'User successfully created'});
    } catch (error) {
        res.status(400).json("Error: " + error.code + " " + error.message);
    }
}
 
const logIn = async (req, res) => {
    try {
        const user = await Parse.User.logIn(req.body.username, req.body.password);
        res.status(200).json({message: `Welcome ${req.body.username}`})
    } catch (error) {
        console.log("Invalid username or password. Please try again!")
    }
};

module.exports = {
    signUp,
    logIn
}
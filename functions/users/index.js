const { read } = require("fs");

const signUp = async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    const { db } = req.app.locals.share;

    const user = new Parse.User();
    user.set("username", req.body.username);
    user.set("password", req.body.password);
    user.set("email", req.body.email);

    try {
        await user.signUp();
        const newUser = Parse.User.current();
        db.RoleQuery.equalTo('name', 'GuestUser');
        const role = await db.RoleQuery.first();

        console.log(role);
        role.getUsers().add(newUser);
        
        await role.save();
        console.log('add role to the user');
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json("Error: " + error.code + " " + error.message);
    }
}
 
const logIn = async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    try {
        await Parse.User.logIn(req.body.username, req.body.password);
        const result = {
            message: `Welcome ${req.body.username}`,
            user: Parse.User.current()
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(200).json({message:"Invalid username or password. Please try again!"});
    }
};

const logOut = async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    try {
        await Parse.User.logOut();
        res.status(200).json({message:'User Successfully Logged Out'});
    } catch (error) {
        res.status(200).json({message:"Invalid username or password. Please try again!"});
    }
};



module.exports = {
    signUp,
    logIn,
    logOut
}
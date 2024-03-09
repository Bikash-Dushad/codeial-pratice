const User = require('../models/user');


module.exports.signuppage = (req, res) => {
    return res.render("signup");
}

module.exports.signup = async (req, res) => {
    var name = req.body.name;
    var email = req.body.email
    var password = req.body.password
    var confirm_password = req.body.confirm_password;

    if (password != confirm_password) {
        console.log("password doesnot matched");
        return res.redirect("back")
    } else {
        var user = await User.findOne({ email });
        if (user) {
            console.log("User already exists")
            return res.redirect("/user/signinpage")
        } else {
            var user = await User.create({ name: name, email: email, password: password });
            console.log(user);
            return res.redirect("/user/signinpage")
        }
    }
}

module.exports.signinpage = async (req, res) => {
    if(req.cookies.user_id){
        return res.redirect('/user/homepage')
    }else{
        return res.render('signin');
    }
}

module.exports.signin = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password
    console.log(password)
    var user = await User.findOne({ email });
    if (user) {
        if (password == user.password) {
            res.cookie('user_id', user.id)
            return res.redirect('/user/homepage')
        } else {
            console.log("password doesnot matched")
            return res.redirect('back')
        }
    } else {
        console.log("Email doesnot exist");
        return res.redirect('/user/signuppage')
    }
}

module.exports.homepage = async (req, res)=>{
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        if(user){
            return res.render('profile',{
                user: user
            })
        }else{
            console("user not found or not authorized");
            return res.redirect("/user/signinpage")
        }
    }else{
        console.log("User not authorized")
        return res.redirect("/user/signinpage")
    }
}

module.exports.logout = async (req, res)=>{
    if(req.cookies.user_id){
        res.clearCookie('user_id');
        return res.redirect('/user/signinpage')
    }else{
        console.log("user is not signed in");
        return res.redirect('back')
    }
}
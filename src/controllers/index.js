const { findAll } = require('../utils/users');
const userUtils = require('../utils/users')
const layout = 'layout/index'

const controller = {
   
    users: (req,res) => {
        const users = userUtils.findAll()
        return res.json({
            msg: 'success',
            data: users,
        })
    },
    save: (req, res) => {
        const {username, password} = req.body;
        const user = {
            username,
            password,
        }
        userUtils.save(user);
        return res.json({
            msg: 'success',
            data: null,
        });
    },
    home: (req ,res) => {
        const login = req.cookies["login"]
        return res.render('home', {
            layout,
            title : 'TraditionalGames',
            login
        })
    },
    game: (req ,res) => {
        const login = req.cookies["login"];
        if (login !== "true") return res.redirect('/login')
         return res.render('game', {
            layout,
            title : 'RockPaperScisor',
            login: true,
            
        });
    },
    getLogin: (req ,res) => {
        const login = req.cookies["login"];
        if (login === "true") res.redirect('/game')
        const flashMsg = req.cookies["flash-msg"]
        return res.render('login', {
            layout,
            title : 'login',
            flashMsg,
            login: false,
        });
        
    },
    postLogin: (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const users = userUtils.findAll();
        const isLoginValid = userUtils.loginValidation(users, user);
        if(isLoginValid === true) {
            res.cookie("login", true, 
            {maxAge:604800000 , httpOnly: true})    
            return res.redirect('/game');
        };
        res.cookie("flash-msg", "your login doens't match with our credential's ", {maxAge: 2000, httpOnly: true})
        return res.redirect('back')
    },
    logout: (req, res) => {
        res.clearCookie("login");
       return res.redirect("/");
    },

    getRegister: (req, res) => {
        const login = req.cookies["login"];
        if (login === "true") res.redirect('/game')
        const flashMsg = req.cookies["flash-msg"]
        return res.render('register', {
            layout,
            title : 'Sign Up',
            flashMsg,
            login: login,
        });
    },

    postRegister: (req, res) => {
        const {username, password} =req.body;
        // const user = {username, password};
        const users = userUtils.findAll();
        const isUserNameExist = users.find((i) => i.username === username) === undefined ? false : true ;
        if (isUserNameExist) {
            res.cookie("flash-msg", "username are not available", {
                maxAge: 2000,
                httpOnly: true
            });
            return res.redirect('back');
        }
        const newUser = {username, password};
        userUtils.save(newUser);
        res.cookie("login", true, {
            maxAge: 604800000 , 
            httpOnly: true
        });
        return res.redirect("/game")
    }

}

module.exports = controller;
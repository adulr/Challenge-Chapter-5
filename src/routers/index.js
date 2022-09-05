const express = require('express')
const router = express.Router();
const{
    home, 
    game, 
    users, 
    getLogin, 
    postLogin,
    save,
    logout,
    getRegister,
    postRegister,
} = require("../controllers")



router.get('/',home);
router.get('/game',game);
router.get('/login',getLogin);
router.get('/logout', logout);
router.get('/register', getRegister);
router.post('/register', postRegister);
router.post('/login', postLogin);


router.get('/users',users);
router.post('/users',save);



module.exports = router;
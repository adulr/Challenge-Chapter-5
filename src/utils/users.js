const fs = require('fs');
const userPath = __dirname + "/../data/user.json"



  const findAll = () => {
        const fileBuffer = fs.readFileSync(userPath, "utf-8");
        const users = JSON.parse(fileBuffer);
        return users;
    };
 const  save = (user) => {
        const users = findAll();
        users.push(user);
        fs.writeFileSync(userPath, JSON.stringify(users));
    };

    const loginValidation = (users, user) => {
        const newUser = users.find((i) => i.username === user.username );
        if(newUser === undefined) return false;
        if(newUser.password !== user.password) return false;
        return true;
    }

module.exports = {
    findAll,
    save,
    loginValidation,
}
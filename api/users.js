/* eslint-disable no-useless-catch */
const express = require("express");
const { 
    createUser,
    getUserByUsername,
    getUser,
    getUserById,
    getPublicRoutinesByUser,
    getAllRoutinesByUser
 } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
const { 
    UserTakenError,
    PasswordTooShortError,
    UnauthorizedError
 } = require('../errors.js');
const router = express.Router();

// POST /api/users/register
router.post('/register', async(req, res, next) => {
    try{
        const { username, password } = req.body;
        const newUser = { username, password }
        const userCheck = await getUserByUsername(username);
        if(userCheck) {
            res.send({
                "error": 'UserTakenError',
                "message":`${UserTakenError(username)}`,
                "name": `UserTakenError`
            })
        } else if (password.length < 8) {
            res.send({
                "error": 'PasswordTooShortError',
                "message": `${PasswordTooShortError()}`,
                "name": `PasswordTooShortError`
        })
        } else {
            const user = await createUser(newUser);
            const token = jwt.sign( 
                { id: user.id, username: user.username }, 
                JWT_SECRET, 
                { expiresIn: "1w" }
            );
            console.log(user, token);
            if(user) res.send({
                "message": 'Thank you for registering!',
                "user": user,
                "token": token
            });
        }  
    } catch(error) {
        next(error);
    }
});
// POST /api/users/login
router.post('/login', async(req, res, next) => {
    try {
        console.log("REQ!", req.body);
        const user = await getUser(req.body.user);
        const token = jwt.sign( 
            { id: user.id, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: "1w" }
        );
        res.send({
            "message": "you're logged in!",
            "user": user,
            "token": token
        })
    } catch(error) {
        next(error);
    }
})
// GET /api/users/me
router.get('/me', async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        // console.log('HEADERS:', req.headers, '!!RES!!', res.body);
        if(!authHeader) {
            console.log(authHeader);
            const unAuth = UnauthorizedError();
            res.status(401).send({
                "error": 'UnauthorizedError',
                "message": `${unAuth}`,
                "name": `UnauthorizedError`
            })
        } else {
            const token = authHeader.split(' ')[1];
            const { id } = jwt.verify(token, JWT_SECRET);
            if(id) {
                const user = await getUserById(id);
                res.send(user)
            }
        }

    } catch (error) {
        next(error);
    }
})
// GET /api/users/:username/routines
router.get('/:username/routines', async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        console.log("HEADERS:", req.headers, "PARAMS:", req.params, "JWTVERY:", jwt.verify(token, JWT_SECRET));
        const { id } = jwt.verify(token, JWT_SECRET);
        const me = await getUserById(id)
        const { username } = req.params;
        const user = await getUserByUsername(username);
        if(user.username != me.username) {
            const publicRoutines = await getPublicRoutinesByUser(user);
            res.send(publicRoutines);
        } else if(me.username === user.username) {
            const allRoutines = await getAllRoutinesByUser(me);
            res.send(allRoutines);
            console.log('all', allRoutines);
        }
    } catch(error) {
        next(error);
    }
})
module.exports = router;

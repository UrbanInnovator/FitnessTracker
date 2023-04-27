const express = require('express');
const { 
    getAllRoutines,
    createRoutine,
    updateRoutine,
    getUserById,
    getUserByUsername,
    getRoutineById,
    destroyRoutine,
    addActivityToRoutine,
    checkRoutineActivity
 } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
const { 
    UnauthorizedError,
    UnauthorizedUpdateError,
    UnauthorizedDeleteError,
    DuplicateRoutineActivityError
 } = require('../errors.js');
const { client } = require('../db');
const router = express.Router();

// GET /api/routines
router.get('/', async(req, res, next) => {
    try{
        const routines = await getAllRoutines();
        res.send(routines);
    } catch(error) {
        next(error);
    }
})
// POST /api/routines
router.post('/', async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("AUTH", authHeader, "REQH", req.headers);
        if(!authHeader) {
            const unAuth = UnauthorizedError();
            res.status(401).send({
                "error": 'UnauthorizedError',
                "message": `${unAuth}`,
                "name": `UnauthorizedError`
            })
        } else {
            const token = authHeader.split(' ')[1];
            const { id } = jwt.verify(token, JWT_SECRET);
            const newRoutine = req.body;
            newRoutine.creatorId = id;
            const createdRoutine = await createRoutine(newRoutine);
            res.send(createdRoutine);
        }
    } catch(error) {
        next(error);
    }
})
// PATCH /api/routines/:routineId
router.patch('/:routineId', async(req, res, next) => {
    try{
     const authHeader = req.headers['authorization']
     if(!authHeader) {
       const unAuth = UnauthorizedError();
       res.status(401).send({
        "error": 'UnauthorizedError',
        "message": `${unAuth}`,
        "name": `UnauthorizedError`
       })
     } else {
      const token = authHeader.split(' ')[1];
      const userId = jwt.verify(token, JWT_SECRET)['id'];
      const user = await getUserById(userId);
      const id = req.params['routineId']
      const editRoutine = await getRoutineById(id);
      if(userId !== editRoutine.creatorId) {
        res.status(403).send({
          "error": 'UnathorizedUpdateError',
          "message": `${UnauthorizedUpdateError(user.username, editRoutine.name)}`,
          "name": `UnauthorizedUpdateError`
        })
      } else {
        const fields = req.body;
        const routineUpdate = await updateRoutine({id, ...fields});
        res.send(routineUpdate) ;
      }
     }
    }catch(error){
     next(error);
    }
  })
// DELETE /api/routines/:routineId
router.delete('/:routineId', async(req, res, next) => {
    try {
     const authHeader = req.headers['authorization']
     const token = authHeader.split(' ')[1];
     const userId = jwt.verify(token, JWT_SECRET)["id"];
     const user =  await getUserById(userId);
     const id = req.params['routineId'];
     const routine =  await getRoutineById(id);
     if(userId !== routine.creatorId) {
       res.status(403).send({
         "error": 'UnathorizedDeleteError',
         "message": `${UnauthorizedDeleteError(user.username, routine.name)}`,
         "name": `UnauthorizedDeleteError`
       })
     } else {
       await destroyRoutine(routine.id);
       res.send(routine);
     }
    } catch(error){
     next(error);
    }
  })
// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async(req, res, next) => {
    try {
        const routId = req.body.routineId;
        const actId = req.body.activityId;
        console.log("ROUT", routId, "ACT", actId);
        const routineActivity = await checkRoutineActivity(routId, actId);
        console.log("RA", routineActivity)
        if(routineActivity) {
            console.log("error")
            res.send({
                "error": "DuplicateRoutineActivityError",
                "message":`${DuplicateRoutineActivityError(routId, actId)}`,
                "name": `DuplicateRoutineActivityError`
            })
        } else {
            console.log("success?")
            const newRoutineAct = await addActivityToRoutine(req.body);
            console.log("newRA", newRoutineAct)
            res.send(newRoutineAct)
        }
    } catch(error) {
        next(error);
    }
})
module.exports = router;

import  dbConnect  from "./dbConnect.js";
import jwt  from "jsonwebtoken";
import { secretKey } from "../credentials.js";

export async function getTasks(req, res) {
  const token = req.headers.authorization;
  let newTask = req.body;
  const user = jwt.verify(token, secretKey);
  if (!newTask || !newTask.task || !user) {
    res.status(400).send({ success: false, message: "Invalid Request"});
    return;
  }
  newTask.userId = user.id;
  // we are going to later add by user ID to this . . .
  const db = dbConnect();
  collection = await db
    .collection("tasks")
    .where('userId', '==', user.id)
    .get()
    .catch(err => res.status(500).send(err));
  const tasks = collection.docs.map((doc) => { // from line 9 to 12 we are looping through every document in the collection 
    let task = doc.data(); // all the info we have in that document 
    task.id = doc.id;
    return task;
  });
  res.send(tasks);
}

export async function createTask(req, res) { // later we will add the user id and the timestamp 
  const newTask = req.body;
  if (!newTask || !newTask.task) {
    res.status(400).send({ success: false, message: "Invalid Request "}) // CYA Cover Your Booty 
    return;
  }
  const db = dbConnect();
  await db.collection('tasks').add(newTask)
  .catch (err => res.status(500).send(err))
  //res.status(201).send("Task Added");
  res.status(201);
  getTasks(req, res); // so it saying to send back the full list of tasks . . t
}

export async function updateTask(req, res) {
  const taskUpdate = req.body;
  const { taskId } = req.params;
  const db= dbConnect();
  await db.collection('tasks').doc(taskId).update(taskUpdate)
    .catch(err => res.status(500).send(err))
  res.status(202).send("Task Updated");
  getTasks(req, res);
}

export function deleteTask(req, res) {
  const { taskId } = req.params;
  res.status(203).send("Task Deleted");
}

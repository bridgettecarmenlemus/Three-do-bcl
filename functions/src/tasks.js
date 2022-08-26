import { dbConnect } from "./dbConnect.js";

export async function getTasks(req, res) {
  const db = dbConnect();
  const collection = await db
    .collection("tasks")
    .get()
    .catch((err) => res.status(500).send(err));
  const tasks = collection.docs.map((doc) => {
    let task = doc.data();
    task.id = doc.id;
    return task;
  });
  res.send(tasks);
}
export function createTask(req, res) {
  const newTask = req.body;
  res.status(201).send("Task Added");
}
export function updateTask(req, res) {
  const taskUpdate = req.body;
  const { taskId } = req.params;
  res.status(202).send("Task Updated");
}

export function deleteTask(req, res) {
  const { taskId } = req.params;
  res.status(203).send("Task Deleted");
}

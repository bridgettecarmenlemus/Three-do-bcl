import dbConnect from "./dbConnect.js";
import { secretKey } from "../credentials.js";
import jwt  from "jsonwebtoken";


export async function createUser(req, res) {
    const { email, password } = req.body;
    const db = dbConnect();
    const user = await db.collection('users').add({ email, password })
        .catch(err => res.status(500).send(err))
        // now we create a token here....
        const token = jwt.sign({ email, id: user.id }, secretKey)
        res.send({ token })
}
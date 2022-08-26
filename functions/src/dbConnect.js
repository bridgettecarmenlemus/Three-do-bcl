import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "../credentials.js";

// in this function we will check and see if we are already connectedt our project, thats our get apps. it returns an array of all of the firebase services, that we are connected to. that is what getApps does. ! = does not, the opposite
export function dbConnect () {
    if(!getApps().length) {
        // not yet connected
        initializeApp({
            credential: cert(credentials)
        })
    }
    // here we are connecting firestore
    return getFirestore
}

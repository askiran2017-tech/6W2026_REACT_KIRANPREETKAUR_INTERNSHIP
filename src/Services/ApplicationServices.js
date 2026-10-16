import { addDoc, collection, getDocs, getDoc, updateDoc,doc, deleteDoc } from "firebase/firestore";
import ApplicationModel from "../Model/ApplicationModel";
import { db } from "../Firebase/FirebaseConfig";
import { useEffect } from "react";
import { toast } from "react-toastify";
class ApplicationServices {
   async add(data) {
    let newApplication = new ApplicationModel();

    newApplication.userId = data.userId;
    newApplication.internshipId = data.internshipId;
    newApplication.hackathonId = data.hackathonId;
    newApplication.submissionUrl = data.submissionUrl;
    newApplication.interviewDate = data.interviewDate;
    newApplication.interviewTime= data.interviewTime;
    newApplication.applicationStatus ="Pending";
    newApplication.createdAt = new Date();
    newApplication.updatedAt = new Date();
        const docRef = await addDoc(collection(db, "Application"), { ...newApplication })
        console.log("NC:", newApplication)
        console.log(data);
        return docRef;

    }
    async all() {

        const querySnapshot = await getDocs(collection(db, "Application"));
        let Application = []
        querySnapshot.forEach((doc) => {
            Application.push({ id: doc.id, ...doc.data() })
        });
        return Application
    }
    async single(id) {
        const docRef = doc(db, "Application", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log("No such document!");
            return false;
        }

    }
    async update(id,payload) {


        const docRef = doc(db, "Application", id)
        await updateDoc(docRef, payload)
        return true;
    }
    async deleteApplication(id){
        const docRef=doc(db,"Application",id)
        await deleteDoc(docRef)
        return true;
        
    }
}
export default new ApplicationServices
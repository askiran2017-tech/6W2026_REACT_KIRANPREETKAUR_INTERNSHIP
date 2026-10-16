import { addDoc, collection, getDocs, getDoc, updateDoc,doc, deleteDoc } from "firebase/firestore";
import InternshipModel from "../Model/InternshipModel";
import { db } from "../Firebase/FirebaseConfig";
import { useEffect } from "react";
import { toast } from "react-toastify";
class InternshipServices {
   async add(data) {
    let newInternship = new InternshipModel();

    newInternship.categoryId = data.categoryId;
    newInternship.companyName = data.companyName;
    newInternship.title = data.title;
    newInternship.description = data.description;
    newInternship.duration = data.duration;
    newInternship.stipend = data.stipend;
     newInternship.location= data.location;
    newInternship.lastDate= data.lastDate;
    newInternship.status = "active";
    newInternship.createdAt = new Date();
    newInternship.updatedAt = new Date();
        const docRef = await addDoc(collection(db, "Internship"), { ...newInternship })
        console.log("NC:", newInternship)
        console.log(data);
    }
    async all() {

        const querySnapshot = await getDocs(collection(db, "Internship"));
        let Internship = []
        querySnapshot.forEach((doc) => {
            Internship.push({ id: doc.id, ...doc.data() })
        });
        return Internship
    }
    async single(id) {
        const docRef = doc(db, "Internship", id);
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


        const docRef = doc(db, "Internship", id)
        await updateDoc(docRef, payload)
        return true;
    }
    async deleteIntern(id){
        const docRef=doc(db,"Internship",id)
        await deleteDoc(docRef)
        return true;
        
    }
}
export default new InternshipServices
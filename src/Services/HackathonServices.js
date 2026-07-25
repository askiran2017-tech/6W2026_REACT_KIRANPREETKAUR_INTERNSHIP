import { addDoc, collection, getDocs, getDoc, updateDoc,doc, deleteDoc } from "firebase/firestore";
import HackathonModel from "../Model/HackathonModel";
import { db } from "../Firebase/FirebaseConfig";
import { useEffect } from "react";
import { toast } from "react-toastify";
class HackathonServices {
   async add(data) {
    let newHackathon = new HackathonModel();

    newHackathon.categoryId = data.categoryId;
    newHackathon.title = data.title;
    newHackathon.description = data.description;
    newHackathon.venue = data.venue;
    newHackathon.eventDate = data.eventDate;
    newHackathon.lastDate= data.lastDate;
    newHackathon.prize= data.prize;
    newHackathon.status = "active";
    newHackathon.createdAt = new Date();
    newHackathon.updatedAt = new Date();
        const docRef = await addDoc(collection(db, "Hackathon"), { ...newHackathon })
        console.log("NC:", newHackathon)
        console.log(data);
    }
    async all() {

        const querySnapshot = await getDocs(collection(db, "Hackathon"));
        let Hackathon = []
        querySnapshot.forEach((doc) => {
            Hackathon.push({ id: doc.id, ...doc.data() })

            // doc.data() is never undefined for query doc snapshots
        });
        return Hackathon
    }
    async single(id) {
        const docRef = doc(db, "Hackathon", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }

    }
    async update(id,payload) {


        const docRef = doc(db, "Hackathon", id)
        await updateDoc(docRef, payload)
        return true;
    }
    async deleteHackathon(id){
        const docRef=doc(db,"Hackathon",id)
        await deleteDoc(docRef)
        return true;
        
    }
}
export default new HackathonServices
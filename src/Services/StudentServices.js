import { addDoc, collection, getDocs, getDoc, updateDoc,doc, deleteDoc } from "firebase/firestore";
import StudentModel from "../Model/StudentModel";
import { db } from "../Firebase/FirebaseConfig";
import { useEffect } from "react";
import { toast } from "react-toastify";

class StudentServices {
   async add(data) {
    let newStudent = new StudentModel();

    newStudent.name = data.name;
    newStudent.email = data.email;
    newStudent.phone = data.phone;
    newStudent.address = data.address;
    newStudent.profileImage = data.profileImage;
    newStudent.userType = "student";
    newStudent.status = "active";
    newStudent.createdAt = new Date();
    newStudent.updatedAt = new Date();
        const docRef = await addDoc(collection(db, "users"), { ...newStudent })
        console.log("NC:", newStudent)
        console.log(data);
    }

    async all() {
        const querySnapshot = await getDocs(collection(db, "users"));
        let student = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            if (data.userType !== 'Admin') {
                student.push({ id: doc.id, ...data })
            }
        });
        return student
    }

    async single(id) {
        const docRef = doc(db, "users", id);
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
        const docRef = doc(db, "users", id)
        await updateDoc(docRef, payload)
        return true;
    }

    async deletestu(id){
        const docRef=doc(db,"users",id)
        await deleteDoc(docRef)
        return true;
    }
}
export default new StudentServices
import { addDoc, collection, getDocs, getDoc, updateDoc,doc, deleteDoc } from "firebase/firestore";
import CategoryModel from "../Model/CategoryModel";
import { db } from "../Firebase/FirebaseConfig";
import { useEffect } from "react";
import { toast } from "react-toastify";
class CategoryServices {
   async add(data) {
    let newCategory = new CategoryModel();

    newCategory.name = data.name;
   newCategory.description=data.description;
    newCategory.status = "active";
    newCategory.createdAt = new Date();
    newCategory.updatedAt = new Date();
        const docRef = await addDoc(collection(db, "Category"), { ...newCategory })
        console.log("NC:", newCategory)
        console.log(data);
    }
    async all() {

        const querySnapshot = await getDocs(collection(db, "Category"));
        let Category = []
        querySnapshot.forEach((doc) => {
            Category.push({ id: doc.id, ...doc.data() })

            // doc.data() is never undefined for query doc snapshots
        });
        return Category
    }
    async single(id) {
        const docRef = doc(db, "Category", id);
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


        const docRef = doc(db, "Category", id)
        await updateDoc(docRef, payload)
        return true;
    }
    async deleteCategory(id){
        const docRef=doc(db,"Category",id)
        await deleteDoc(docRef)
        return true;
        
    }
}
export default new CategoryServices
import {addDoc,collection,getDocs,doc,getDoc,updateDoc,deleteDoc} from "firebase/firestore"
import { db } from "../Firebase/FirebaseConfig"
import ResultModel from "../Model/ResultModel"

class ResultServices{

    async add(data){

        let newResult=new ResultModel()

        newResult.applicationId=data.applicationId
        newResult.result=data.result
        newResult.remarks=data.remarks
        newResult.publishedAt = data.publishedAt

        await addDoc(collection(db,"Result"),{
            ...newResult
        })
    }

    async all(){

        let snapshot=await getDocs(collection(db,"Result"))

        let result=[]

        snapshot.forEach((doc)=>{
            result.push({id:doc.id,...doc.data()})
        })
        return result
    }

    async single(id){
        let data=await getDoc(doc(db,"Result",id))
        return{id:data.id,...data.data()}
    }

    async update(id,data){
         await updateDoc(doc(db,"Result",id),data)
    }

    async deleteResult(id){
        await deleteDoc(doc(db,"Result",id))
    }

}

export default new ResultServices()
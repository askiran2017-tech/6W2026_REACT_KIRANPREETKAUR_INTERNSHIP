import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/FirebaseConfig";
import UserModel from "../Model/UserModel";
import AuthServices from "./AuthServices";
class UserServices {
    async register(data) {
        const UserData = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = UserData.user
        let newUser = new UserModel()
        newUser.id = user.uid
        newUser.name=data.name
        newUser.email = data.email
        newUser.password = data.password
        newUser.contact = data.contact
        newUser.profileImage = data.profileImage;
        newUser.userType = "user";
        await setDoc(doc(db, "users", user.uid), { ...newUser })

        await signOut(auth)
        return UserData;
    }

    async Login(data) {
        const UserData = await signInWithEmailAndPassword(auth, data.email, data.password)
        const user = UserData.user
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
            const firestoreData = userDoc.data()
            const authData = {
                id: user.uid,
                name: firestoreData.name,
                email:firestoreData.email,
                userType: firestoreData.userType,
                token: user.accessToken
            }
            AuthServices.setData(authData)
             return authData;  
    }
        }
    }

export default new UserServices();
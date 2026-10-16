import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/FirebaseConfig";
import UserModel from "../Model/UserModel";
import AuthServices from "./AuthServices";

class UserServices {
    async register(data) {
        const UserData = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = UserData.user;
        let newUser = new UserModel();
        newUser.id = user.uid;
        newUser.name = data.name;
        newUser.email = data.email;
        newUser.password = data.password;
        newUser.contact = data.contact || data.phone || "";
        newUser.phone = data.contact || data.phone || "";
        newUser.address = data.address || "";
        newUser.profileImage = data.profileImage || "";
        newUser.userType = 2;
        newUser.status = "active";
        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        
        await setDoc(doc(db, "users", user.uid), { ...newUser });
        await signOut(auth);
        return UserData;
    }

    async Login(data) {
        const UserData = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = UserData.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const token = await user.getIdToken();

        if (userDoc.exists()) {
            const firestoreData = userDoc.data();
            
            if (firestoreData.status === "blocked" || firestoreData.status === "inactive") {
                await signOut(auth);
                throw new Error("Your account has been deactivated. Please contact the administrator.");
            }

            const authData = {
                id: user.uid,
                name: firestoreData.name || "User",
                email: firestoreData.email || user.email,
                userType: firestoreData.userType || 2,
                token: token
            };
            AuthServices.setData(authData);
            return authData;
        } else {
            const authData = {
                id: user.uid,
                name: user.displayName || "User",
                email: user.email,
                userType: 2,
                token: token
            };
            AuthServices.setData(authData);
            return authData;
        }
    }
}

export default new UserServices();
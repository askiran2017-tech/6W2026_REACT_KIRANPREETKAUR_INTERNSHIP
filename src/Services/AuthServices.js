import { signOut } from "firebase/auth"
import { auth } from "../Firebase/FirebaseConfig"

class AuthServices {
    
    async setData(res) {
        localStorage.setItem("name", res.name)
        localStorage.setItem("email", res.email)
        localStorage.setItem("id", res.id)
        localStorage.setItem("userType", res.userType)
        localStorage.setItem("token", res.token)
        localStorage.setItem("IsLogin","true")
    }
    getToken() {
    return localStorage.getItem("token");
}
    getEmail(){
        return localStorage.getItem("email")
    }
    getId(){
        return localStorage.getItem("id")
    }
     getUserType() {
        return localStorage.getItem("userType");
    }
     isLoggedIn() {
        return localStorage.getItem("IsLogin") === "true";
    }

    logOut(){
        localStorage.clear()
        sessionStorage.clear()
        signOut(auth)
    }
}
export default new AuthServices();
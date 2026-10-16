import { signOut } from "firebase/auth"
import { auth } from "../Firebase/FirebaseConfig"

class AuthServices {

    setData(res) {
        if (!res) return;
        localStorage.setItem("name", res.name || "");
        localStorage.setItem("email", res.email || "");
        localStorage.setItem("id", res.id || "");
        localStorage.setItem("userType", res.userType || "");
        localStorage.setItem("token", res.token || "");
        localStorage.setItem("IsLogin", "true");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    getEmail() {
        return localStorage.getItem("email");
    }

    getName() {
        return localStorage.getItem("name");
    }

    getId() {
        return localStorage.getItem("id");
    }

    getUserType() {
        return localStorage.getItem("userType");
    }

    isLoggedIn() {
        return localStorage.getItem("IsLogin") === "true";
    }


    isAdmin() {
        const type = this.getUserType();
        return this.isLoggedIn() && (type == 1 || type === "1" || type === "admin" || type === "Admin");
    }

    isStudent() {
        const type = this.getUserType();
        return this.isLoggedIn() && (type == 2 || type === "2" || type === "student" || type === "user");
    }

    async logOut() {
        localStorage.clear();
        sessionStorage.clear();
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
}
export default new AuthServices();
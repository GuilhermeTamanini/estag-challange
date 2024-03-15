import { jwtDecode } from "jwt-decode"

export const isAuthenticated = () => {
        const token = JSON.stringify(sessionStorage.getItem("user")) || [];

        if(token == "null") { 
            console.log("Usuario não esta logado");
        } else {
            let decodedToken = jwtDecode(token);
            let logged = decodedToken.isAdmin;
            return logged;
        }
}

import './Login.css';
import Navbar from "../components/Navbar/Navbar";
import { isAuthenticated } from '../auth';
import { useState, useEffect } from 'react';

export default function Login() {
    const [users, setUsers ] = useState([]);
    useEffect(() => {
        fetch("http://localhost/routes/login.php?action=get")
        .then(res => res.json())
        .then(data => {setUsers(data)})
    },[])
    function sign() {
        let username = document.getElementById("post-user").value;
        let password = document.getElementById("post-password").value;

        for(let i = 0; i < users.length; i++ ) {
            if(users[i].username === username) {
                alert("Usuario ja cadastrado");
                return;
            }
        }
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);

        fetch("http://localhost/routes/login.php?action=post", {
            method: "POST",
            body: data
        })
    }

    function login() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let data = new FormData();
        data.append("username", username);
        data.append("password", password);
        fetch("http://localhost/routes/login.php?action=login", {
            method: "POST",
            body: data,
        })
        .then(res => res.json())
        .then(data => {
            let user = JSON.parse(sessionStorage.getItem("user")) || [];
            user.push(data);
            sessionStorage.setItem("user", JSON.stringify(user));
            location.href="http://localhost:5173/";
        })
        .catch(err => alert("Usuario ou senha invalidos"));
        //buscar do banco os nomes de usuarios para comparar com o que esta sendo cadastradose for igual manda um alert usar for
    }
    return(
        <>
        <Navbar />
        <div className="tudo">
            <div className="login-container">
                {isAuthenticated() == false || isAuthenticated == true ? null :
                <form>
                    <h1 className="login-title">Sign in</h1>
                    <div>
                        <input type="text" className="login-input" name="username" id='post-user' placeholder="Username"  pattern="[a-zA-Z0-9]+" title="Apenas letras e números!" maxLength="50" required/>
                        <input type="text" className="login-input" name="password" id='post-password' placeholder="Password"  pattern="[a-zA-Z0-9]+" title="Apenas letras e números!" maxLength="50" required/>
                    </div>
                    <button className="btn" onClick={(e) => {e.preventDefault();sign()}}>Cadastrar</button>
                </form>
                }
                {isAuthenticated() == false || isAuthenticated == true ? null :
                <form>
                    <h1 className="login-title">Login</h1>
                    <div>
                        <input type="text" className="login-input" name="username" id="username" placeholder="Username" />
                        <input type="text" className="login-input" name="password" id="password" placeholder="Password"/>
                    </div>
                    <button className="btn" onClick={(e) => {e.preventDefault(); login()}}>Login</button>
                </form>
                }
            </div>
        </div>
        </>
    )
}
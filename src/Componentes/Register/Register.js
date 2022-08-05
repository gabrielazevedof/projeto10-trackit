import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"


import logo from "../assets/logo.png"
import "./styles.css"

export default function TelaCadastro(){
    return(
        <div className="telaCadastro">
            <img src={logo} alt="logo" />
            <Cadastro />
            <VoltarLogin />
        </div>
    )
}

function Cadastro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate()

    function cadastrar(event){
        event.preventDefault()

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
            email,
            password: password,
            name: name,
            image: image
        })
        promise.then( response =>{
            console.log("test then")
            const {data} = response
            console.log({data})
            navigate("/")

        })
        promise.catch(console.log("test catch"))
    }
    return(
        <div className="cadastro">
            <form onSubmit={cadastrar}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" required/>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="nome" required/>
                <input type="url" value={image} onChange={e => setImage(e.target.value)} placeholder="foto" required/>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

function VoltarLogin(){
    return(
        <Link to="/">
            <div className="voltarLogin">
                Já tem uma conta? faça login!
            </div>
        </Link>
    )
}
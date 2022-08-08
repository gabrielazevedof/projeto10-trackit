import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignIn from "../SingIn/SignIn"
import Register from "../Register/Register"
import Habitos from "../Habitos/Habitos"
import Hoje from "../Hoje/Hoje"
import Historico from "../Historico/Historico"


import "./reset.css"
import "./styles.css"

export default function App(){
    let user = {
        token: "",
        image: ""
    }
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn user={user}/>}/>
                <Route path="/cadastro" element={<Register />}/>
                <Route path="/habitos" element={<Habitos user={user} />} />
                <Route path="/hoje" element={<Hoje user={user} />} />
                <Route path="/historico" element={<Historico user={user} />} />
            </Routes>
            
        
        </BrowserRouter>
    )
}
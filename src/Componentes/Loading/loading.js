import {useNavigate} from "react-router-dom"

export default function Loading () {
    const navigate = useNavigate()
    
    function voltar() {
        console.log("foi")
        navigate("/habitos")
    }
    setTimeout(voltar, 1)
    
    return (
        <></>
    )
}
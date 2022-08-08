import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"

import "./styles.css"

export default function Hoje({user}){
    return(
        <div className="hoje">
            <Header image={user.image} />
            <Titulo />
            <Habitos token={user.token} />
        </div>
    )
}

function Header ({image}) {
    const navigate = useNavigate()
    function logoff () {
        navigate("/")
    }
    return (
        <div className="header">
            <img src={image} alt="imagem de perfil"/>
            TrackIt
            <ion-icon name="log-out-outline" onClick={() => logoff()} ></ion-icon>
        </div>
    )
}

function Titulo () {
    dayjs.locale("pt-br");

    let diaMes = dayjs().format('DD/MM');
    let diaSemana = dayjs().format('dddd');
    let array = diaSemana.split("")
    let stringSemana = ""
    for (let i = 0; i < array.length; i++) {    
        if (array[i] !== "-") {
            stringSemana += array[i]
        } else {
            break
        }
    }
    let dia = stringSemana[0].toUpperCase() + stringSemana.slice(1)
    return (
        <div className="titulo">
            <p>{dia}, {diaMes}</p>
            <p className="progresso">Nenhum hábito concluído ainda</p>
        </div>
    )
}

function Habitos ({token}) {
    const [habitos, setHabitos] = useState({})
    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config)
        promise.then( response => {
            const {data} = response
            console.log(data)
        })
        promise.catch(err => {
            console.log(`Erro ${err.response.status}, ${err.response.data.message} `)
        })
        
        console.log(url, config)
    }, [])
    return (
        <div className="habitos">
            <div className="card">
                {habitos.map((habito) => <Habito key={habito.id} id ={habito.id} habito={habito.name} sequencia={habito.currentSequence} recorde={habito.highestSequence} />)}
            </div>
        </div> 
    )
}

function Habito (id, habito, sequencia, recorde) {
    console.log(id)
    return (
        <div className="habito">
            <div className="dados">
                <h1>{habito}</h1>
                <p>Sequencia atual: {sequencia}<br/> 
                Seu recorde: {recorde}</p>
            </div>
        </div>
    )
}
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

import "./styles.css"

export default function Habitos({user}){
    const [adcionar, setAdcionar] = useState(false)

    return (
        <div className="habitos">
            <Header user={user}/>
            <MeusHabitos adcionar={adcionar} setAdcionar={setAdcionar}/>
            <CriarHabito user={user} adcionar={adcionar} setAdcionar={setAdcionar} />
            <ListaHabitos user={user}/>
            <Footer />
        </div>
    )
}

function Header({user}){
    console.log(user.image)
    return(
        <div className="header">
            Trackit
            <img src={user.image} alt="perfil" />
        </div>
    )
}

function MeusHabitos({adcionar, setAdcionar}){
    return(
        <div className="meusHabitos">
            <div className="menu">
                Meus Habitos
                <div className="button" onClick={() => setAdcionar(true)}>+</div>
                {adcionar ?
                    <CriarHabito /> : ""
                }
            </div>
        </div>
    )
}

function CriarHabito({user, adcionar, setAdcionar}){
    const [habito, setHabito] = useState("")
    const [dias, setDias] = useState([])

    const semana = [
        {dia: "domingo", sigla: "D", numero: 0},
        {dia: "segunda", sigla: "S", numero: 1},
        {dia: "terça", sigla: "T", numero: 2},
        {dia: "quarta", sigla: "Q", numero: 3},
        {dia: "quinta", sigla: "Q", numero: 4},
        {dia: "sexta", sigla: "S", numero: 5},
        {dia: "sábado", sigla: "S", numero: 6},
    ]

    function Salvar({user}){
        const config = {
            headers: {
                Authorization: `Baarer ${user}`
            }
        }

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const body = {
            name: habito,
            days: [dias]
        }

        const promise = axios.post(url, body, config)
        promise.then(response => {
            const {data} = response
            console.log(data)
            setAdcionar(false) 
        })
        promise.catch(err => {
            let frase = `Erro ${err.response.status}, ${err.response.data.message}`
            alert(frase)
        })
    }

    return(
        <>
            {adcionar ?
                <div className="criarHabito">
                    <input type="text" placeholder="nome do habito" value={habito} onChange={(e) => setHabito(e.target.value)} />
                    <div className="semana">
                        {semana.map(dia => <Botao siglas={dia.sigla} numero={dia.numero} setDias={setDias} /> )}
                    </div>
                    <div className="acoes">
                        <button className="cancelar" onClick={() => setAdcionar(false)}>Cancelar</button>
                        <button className="salvar" onClick={() => Salvar()}>Salvar</button>
                    </div>
                </div>
                    : ""
            }
        </>
    )
}


function Botao({sigla, numero, setDias}){
    const [selecionar, setSelecionar] = useState(false)
    if(selecionar === true){
        setDias(numero)
    }

    let css = `${selecionar}`
    return(
        <button className={css} onCLick={() => setSelecionar(!selecionar) }>
            {sigla}
        </button>
    )
}

function ListaHabitos({user, habitos}){
    const [temHabitos, setTemHabitos] = useState(false)

    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const promise = axios.get(url, config)
        promise.then( response => {
            const data = response
            setTemHabitos(data)
        })
        promise.catch(err => {
            console.log(`Erro ${err.response.status}, ${err.response.data.message}`)
        })
    }, [])

    return(
        <>
            {temHabitos ?
                <>
                    {/* {habitos.map(habitos => <HabitosCriados id={habitos.id} name={habitos.name} days={habitos.days}/>)} */}
                </>
                :
                <div className="lista-de-habitos">
                    Você não tem nenhum hábito cadastrado ainda.
                    Adicione um hábito para começar a trackear!
                </div>
            }
        </>
    )

}

function HabitosCriados(){
    return(
        <div>
            Aqui tem um hábito
        </div>
    )
}



function Footer(){
    const percentage = 66
    const navigate = useNavigate()

    return(
        <div className="footer">

            <div className="buttonHabitos" onClick={() => navigate("/habitos") }>Habitos</div>

            <CircularProgressbar value={percentage} text="Hoje" styles={buildStyles({
                strokeLinecap: 'butt',
                pathTransitionDuration: 0.5,
                pathColor: 'rgba(82, 182, 255, 1)',
                textColor: 'black',
                trailColor: 'transparent',
                backgroundColor: '#52b6ff',
            })}/>

            <div className="buttonHistorico" onClick={() => navigate("/historico") }  >Hitórico</div>
        </div>
    )
}
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import "./styles.css"

export default function Habitos ({user}) {
    const [temHabitos, setTemHabitos] = useState({})
    return (
        <div className="habitos">
            <Header image={user.image} />
            <AdicionarHabitos token={user.token}/>
            <ListaHabitos token={user.token} temHabitos={temHabitos} setTemHabitos={setTemHabitos}/>
            <Footer />
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

function AdicionarHabitos ({token}) {
    const [adicionar, setAdicionar] = useState(false)
    return (
        <>
            <div className="titulo">
                <p>Meus Hábitos</p>
                <button onClick={() => setAdicionar(true)}>+</button>
            </div>
            {adicionar ? 
                <CriarHabito adicionar={adicionar} setAdicionar={setAdicionar} token={token}/> : "" 
        }
        </>
    )
}

function CriarHabito ({adicionar, setAdicionar, token}) {
    const navigate = useNavigate()
    const [habito, setHabito] = useState("")
    const dias = []
    const semana = [
        {dia: "domingo", sigla: "D", numero:0},
        {dia: "segunda", sigla: "S", numero:1},
        {dia: "terça", sigla: "T", numero:2},
        {dia: "quarta", sigla: "Q", numero:3},
        {dia: "quinta", sigla: "Q", numero:4},
        {dia: "sexta", sigla: "S", numero:5},
        {dia: "sábado", sigla: "S", numero:6}
    ]

    function Salvar() {
        let days = []
        for (let i = 0; i < 7; i++) {
            if (dias.includes(i)) {
              days.push(i)
            }
        }
        const config = {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const body = {
            name: habito,
            days: days
        }
        const promise = axios.post(url, body, config)
        promise.then( response => {
            const {data} = response
            console.log(data)
            setAdicionar(false)
            navigate("/loading")
        })
        promise.catch(err => {
            let frase = `Erro ${err.response.status}, ${err.response.data.message} `
            alert(frase)
        })
    }
    
    return (
        <>
        {adicionar ? 
            <div className="criar-habito">
                <input type="text" placeholder="nome do hábito" value={habito} onChange={(e) => setHabito(e.target.value)} />
                <div className="semana">
                    {semana.map(dia => <Botao key={dia.numero} sigla={dia.sigla} numero={dia.numero} dias={dias} /> )}
                </div>
                <div className="acoes">
                    <button className="cancelar" onClick={() => setAdicionar(false)}>Cancelar</button>
                    <button className="salvar" onClick={() => Salvar()}>Salvar</button>
                </div>
            </div> 
            : ""
        }
        </>
    )
}

function Botao ({sigla, numero, dias}) {
    const [selecionar, setSelecionar] = useState(false)
    if(selecionar === true) {
        dias.push(numero)
    }
    
    let css = `${selecionar}`
    return (
        <button className={css} onClick={() => setSelecionar(!selecionar)}>
            {sigla}
        </button>
    )
}

function ListaHabitos ({token, temHabitos, setTemHabitos}) {
    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config)
        promise.then( response => {
            const {data} = response
            setTemHabitos(data)
        })
        promise.catch(err => {
            console.log(`Erro ${err.response.status}, ${err.response.data.message} `)
        })
        
    }, [])

    console.log(temHabitos, temHabitos > temHabitos.length)
    return (
        <>
        {temHabitos.length > 0 ?
            <div className="listaHabitos">
                {temHabitos.map(habito => <HabitosCriados id={habito.id} name={habito.name} days={habito.days} key={habito.id} token={token}/>)}
            </div> : 
            <div className="lista-de-habitos">0
                Você não tem nenhum hábito <br/> cadastrado ainda. 
                Adicione um hábito <br/> para começar a trackear!
            </div>
            }
        </>
    )
}

function HabitosCriados ({id, name, days, token}) {
    const navigate = useNavigate()
    const semana = [
        {dia: "domingo", sigla: "D", numero:0},
        {dia: "segunda", sigla: "S", numero:1},
        {dia: "terça", sigla: "T", numero:2},
        {dia: "quarta", sigla: "Q", numero:3},
        {dia: "quinta", sigla: "Q", numero:4},
        {dia: "sexta", sigla: "S", numero:5},
        {dia: "sábado", sigla: "S", numero:6}
    ]
    console.log(id, name, days)
    return (
        <div className="card">
            <p>{name}</p>
            <ion-icon name="trash-outline" onClick={() => DeletarHabito()} ></ion-icon>
            <div className="dias-da-semana">
                {semana.map(dia => <DiasDaSemana sigla={dia.sigla} numero={dia.numero} days={days} key={dia.numero} />)}
            </div>
        </div>
    )
    function DeletarHabito(){
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        console.log(config)
        console.log(id)
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
        promise.then( response => {
            <ListaHabitos />
            console.log(response)
            navigate("/loading")
        })
        promise.catch(err => {
            console.log("erro ao remover")
        })
    }    

}

function DiasDaSemana ({sigla, numero, days}) {
    let css = "dia"
    if (days.includes(numero)) {
        css = "dia selecionado"
    }
    return (
        <div className={css}>
            {sigla}
        </div>
    )
}

function Footer () {
    return (
        <div className="footer">
            <Link to="/habitos">Hábitos</Link>
            <Link to="/hoje"> <Hoje /> </Link>
            <Link to="/historico">Histórico</Link>
        </div>
    )
}

function Hoje () {
    return (
        <div className="hoje">
            <p>Hoje</p>
            {/* <img src={semiCirculo} alt="semicirculo" /> */}
        </div>
    )
}
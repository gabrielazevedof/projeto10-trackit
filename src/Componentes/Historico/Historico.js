import "./styles.css"

export default function Historico({user}){
    return(
        <div className="historico">
            <Header image={user.image}/>
            <TItulo />
            <MeuHistorico />
        </div>
    )
}

function Header({image}){
    return(
        <div className="header">
            TrackIt
            <img src={image} alt="imagem de perfil"/>
    </div>
    )
}
function TItulo(){
return(
    <div className="titulo">Histórico</div>
)
}
function MeuHistorico(){
    return(
        <div className="meuHistorico">
            Em breve vocêpoderá ver o Histórico <br/>
            dos seus habitos aqui!
        </div>

    )
}
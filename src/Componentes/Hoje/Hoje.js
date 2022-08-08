import "./styles.css"

export default function Hoje({user}){
    return(
        <div className="hoje">
            <Header image={user.image} />
        </div>
    )
}

function Header({image}) {
    return (
        <div className="header">
            TrackIt
            <img src={image} alt="imagem de perfil"/>
        </div>
    )
}
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const PokedexName = () => {
/*estaba borrado la parte de abajo del export por alguna razón */

    // para acceder al name del path en el enrutador
    const { name } = useParams()

    // peticion dependiendo del nombre
    const url = ` https://pokeapi.co/api/v2/pokemon/${name}`

    const [pokemon, getPokemonByName, hasError] = useFetch(url)

    useEffect(()=> {
        getPokemonByName()
    }, [name])


    return (
        <div>
            {
                hasError
                ? <h1>{`This pokemon ${name} doesn't exits `}</h1>
                : (
                    <>
                        <img 
                        src = { pokemon?.sprites.other['official-artwork'].front_default} 
                        alt={ pokemon?.name} 
                        />
                        <h2>{ pokemon?.name} </h2>
                    </>
                )
            }
        </div>
    )
};

export default PokedexName
import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import './styles/pokecard.css'

function PokeCard({ url }) {

    const [pokemon, getPokemonInf] = useFetch(url)

    useEffect(() => {
        getPokemonInf()
    }, [])
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/pokedex/${pokemon.name}`)
    }


    return (
        <article className={`pokecard ${pokemon?.types[0].type.name}`} onClick={handleNavigate}>
            <header className={`pokecard__header bg-${pokemon?.types[0].type.name}`}>
                <img
                    className="pokecard__img"
                    src={pokemon?.sprites.other['official-artwork'].front_default}
                    alt="" />
            </header>
            <section className="pokecard__body">
                <h3 className="pokecard__name">{pokemon?.name}</h3>
                <ul className="pokecard__types">
                    {pokemon?.types.map(type => (
                        <li
                            className="pokecard__types-item"
                            key={type.type.url}>{type.type.name}</li>
                    ))}
                </ul>
            </section>
            <footer className="pokecard__footer">
                <ul className="pokecard__stats">
                    {pokemon?.stats.map(statInf => (
                        <li
                            className="pokecard__stats-item"
                            key={statInf.stat.url}>
                            <span className="pokecard__stats-label">{statInf.stat.name}</span>
                            <span className="pokecard__stats-value">{statInf.base_stat}</span>
                        </li>
                    ))}
                </ul>
            </footer>
        </article>
    )
}

export default PokeCard
import React from 'react'
import PokeCard from './PokeCard'
import "./styles/pokecard.css"

const PokeContainer = ({ pokemons }) => {

    console.log(pokemons)

    return (
        <div className='pokecard__map'>
            {
                pokemons?.map(pokemon => {
                    <PokeCard
                        key={pokemon.url}
                        url={pokemon.url}
                    />
                })
            }
        </div>
    )
}

export default PokeContainer

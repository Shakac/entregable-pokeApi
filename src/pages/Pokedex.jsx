import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import PokeContainer from "../components/Pokedex/PokeContainer";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('all-pokemons')

  const trainerName = useSelector(states => states.trainerName)

  let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [ pokemons, getAllPokemons, hasError, setPokemons ] = useFetch(url)
  const urlTypes = 'https://pokeapi.co/api/v2/type'
  const [ types, getAlltypes ] = useFetch(urlTypes)



  useEffect(() => {

      if (selectValue === 'all-pokemons') {
          getAllPokemons()
      } else {
          axios.get(selectValue)
              .then(res => {
                  const data = {
                      results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
                  }
                  setPokemons(data)
              })
              .catch(err => console.log(err))
      }

      
  }, [selectValue]) 
  
  
  useEffect(()=>{
      getAlltypes()
  },[])

  
  
  // Navegar entre rutas 
  const navigate = useNavigate()
  // Busqueda del usuario
  const searchPokemon = useRef()


  const handleSubmit = (e) => {
      e.preventDefault()
      const inputValue =  searchPokemon.current.value.trim().toLowerCase()
      navigate(`/pokedex/${inputValue}`)
  }

  const handleChangeType = (e) => {
      setSelectValue(e.target.value)
  }


  return (
      <div>
          <p>Welcome {trainerName}!, you can find your favorite pokemon</p>
          <form onSubmit={handleSubmit}>
              <input ref={searchPokemon} type="text" />
              <button>Search</button>
              <select onChange={handleChangeType}>
                  <option value={'all-pokemons'}>All pokemons</option>
                  {
                      types?.results.map(typeInf => (
                          <option 
                              key={typeInf.url} 
                              value={typeInf.url}>{typeInf.name}
                          </option>
                      ))
                  }
              </select>
          </form>
          <PokeContainer pokemons={pokemons?.results}/>
      </div>
  )
};

export default Pokedex
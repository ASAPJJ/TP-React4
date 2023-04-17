import React, {useState, useEffect} from 'react'

export default function BotonApi()
 {

    const [pokemones, setPokemon] = useState([]);
    
    useEffect(() =>{
    },[])

    const getPokemones = async() =>{
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      const listaPokemones = await response.json();
      const { results } = listaPokemones

      const newPokemones = results.map(async (pokemon) =>{
        const response = await fetch(pokemon.url)
        const poke= await response.json()

        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other["official-artwork"].front_default
        }
      }) 
      setPokemon(await Promise.all(newPokemones))
    }
    return (
    <div>
        <h1>listar puchamons</h1>

        <button onClick={getPokemones}>PUCHA</button>
        {
          pokemones.map((pokemon) =>{
            return (
              <div>
                <img src={pokemon.img} alt={pokemon.name} srcset="" />
                <p>{pokemon.name}</p>
                <span>{pokemon.id}</span>
              </div>
            )
          })
        }
    </div>
  )
}
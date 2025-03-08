import { useState, useEffect } from "react";
import PokemonCards from "./PokemonCards";
import "./index.css";
const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

export default function Pokemon(){

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemon = async() =>{
    try{
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const PokemonData = data.results.map(async (currPokemon) =>{
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });

      // returns promises
      // console.log(PokemonData); 

      const dataResponses= await Promise.all(PokemonData);
      console.log(dataResponses);
      setPokemon(dataResponses);
      setLoading(false);


    }catch(e){
      console.log(e);
      setLoading(false);
      setError(e);
    }
  } 

  useEffect(() => {
    fetchPokemon();
  }, []);

  if(loading){
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if(error){
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Ria's Pokedex</h1>
      </header>
      <div>
        <ul className="cards">
          {
            pokemon.map((currPokemon) => {
              return <PokemonCards key={currPokemon.id}
              pokemonData={currPokemon} />
            })
          }
        </ul>
      </div>
    </section>
  );
}
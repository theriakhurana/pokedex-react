import "./index.css";
import { useEffect } from "react";
const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

export default function Pokemon(){

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

      console.log(PokemonData);
      
    }catch(e){
      console.log(e);
    }
  } 

  useEffect(() => {
    fetchPokemon();
  }, []);
  return (
    <></>
  );
}
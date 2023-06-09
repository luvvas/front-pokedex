import React, { useState, createContext } from 'react'

import { PokemonData } from '../screens/Pokemon'

type FavoritePokemon = {
  title: string;
  url: string;
  id: number;
}

type FavoritePokemonContextValue = {
  favoritePokemon: PokemonData[];
  addFavoritePokemon: (pokemon: FavoritePokemon) => void;
  removeFavoritePokemon: (pokemonId: number) => void;
  isPokemonFavorite: (pokemonId: number) => boolean;
}

export const FavoritePokemonContext = createContext(
  {} as FavoritePokemonContextValue
);

export function FavoritePokemonProvider({ children }: { children: React.ReactNode}) {
  const [favoritePokemon, setFavoritePokemon] = useState([])

  const addFavoritePokemon = (favoritePokemon: FavoritePokemon) => {
    setFavoritePokemon((prevFavorites) => [...prevFavorites, favoritePokemon])
  }

  const removeFavoritePokemon = (pokemonId: number) => {
    setFavoritePokemon((prevFavorites) => 
      prevFavorites.filter((favPokemon) => favPokemon.id !== pokemonId))
  }

  const isPokemonFavorite = (pokemonId: number) => {
    return favoritePokemon.some((favPokemon) => favPokemon.id === pokemonId)
  }

  return (
    <FavoritePokemonContext.Provider
      value={{
        favoritePokemon,
        addFavoritePokemon,
        removeFavoritePokemon,
        isPokemonFavorite
      }}
    >
      {children}
    </FavoritePokemonContext.Provider>
  )
}
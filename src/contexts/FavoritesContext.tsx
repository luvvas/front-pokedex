import React, { useState, createContext, ReactNode, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoritePokemon = {
  title: string;
  url: string;
  id: number;
}

type FavoritePokemonContextValue = {
  favoritePokemon: FavoritePokemon[];
  addFavoritePokemon: (pokemon: FavoritePokemon) => void;
  removeFavoritePokemon: (pokemonId: number) => void;
  isPokemonFavorite: (pokemonId: number) => boolean;
}

export const FavoritePokemonContext = createContext<FavoritePokemonContextValue>(
  {} as FavoritePokemonContextValue
);

export function FavoritePokemonProvider({ children }: { children: ReactNode }) {
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

  useEffect(() => {
    const getFavoritePokemons = async () => {
      try {
        const storedFavoritePokemons = await AsyncStorage.getItem('favoritePokemon')
        if(storedFavoritePokemons !== null) {
          setFavoritePokemon(JSON.parse(storedFavoritePokemons))
          console.log('get the favorite pokemons')
        }
        
      } catch (e) {
        console.log('Error retrieving favorite pokemons: ', e)
      }
    }

    getFavoritePokemons()
  }, [])

  useEffect(() => {
    const saveFavoritePokemons = async () => {
      try {
        await AsyncStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon))
        console.log('saved')
      } catch (e) {
        console.log('Error retrieving favorite pokemons: ', e)
      }
    }
    saveFavoritePokemons()
  }, [favoritePokemon])

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
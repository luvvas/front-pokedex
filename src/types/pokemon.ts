export type Stat = {
  base_stat: number
  effort: number
  stat: Stat2
}

export type Stat2 = {
  name: string
  url: string
}

export type Type = {
  slot: number
  type: Type2
}

export type Type2 = {
  name: string
  url: string
}

export type Ability = {
  ability: Ability2
  is_hidden: boolean
  slot: number
}

export type Ability2 = {
  name: string
  url: string
}

export type Species = {
  name: string
  url: string
}

export type Color = {
  name: string
}

export type FlavorText = {
  flavor_text: string
}

export type Habitat = {
  name: string
}

export type EvolutionChain = {
  url: string
}

export type Generation = {
  name: string
}

export type PokemonSpecies = {
  color: Color
  flavor_text_entries: FlavorText[]
  habitat: Habitat,
  evolution_chain: EvolutionChain
  generation: Generation
}

export type PokemonData = {
  weight: number;
  height: number;
  base_experience: number;
  abilities: Ability[];
  types: Type[];
  stats: Stat[];
  species: Species;
}
import {api_pokemon} from './url'

export function getPokemon(parametro) {
    return fetch(api_pokemon+parametro)
}
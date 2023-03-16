import $ from 'jquery' 
import { getPokemon } from './api'

obtenerPokemon()

//Quitar actualizacion al precionar enter
$('#input_pokemon').on('keydown', (e)=> {
    if (e.keyCode===13) {
        e.preventDefault()
        return false;
    }
})


//Evento boton (Buscar pokemon)
$('#buscar_pokemon').on('click',() => {
    let nombre = $('#input_pokemon').val()
    let pokemon =  getPokemon(nombre)
    pokemon.then((res)=>res.json())
    .then((res2) => {
        console.log(res2);
        let {name, sprites, stats, types}=res2
        llenarInfo(name, sprites, stats, types)
    })
    .catch((e)=> {
        alert('El pokemon que buscas no existe, intentalo de nuevo');
        window.location.reload()
    });
});


function obtenerPokemon() {
    let random = numeroAleatorio(150)+1;

    let pokemon =  getPokemon(random)
    pokemon.then((res)=>res.json())
    .then((res2) => {
        console.log(res2);
        let {name, sprites, stats, types}=res2
        llenarInfo(name, sprites, stats, types)
    })
}


// Funcion numero aleatorio
function numeroAleatorio(max) {
    return Math.floor(Math.random()*max)
}

// LLenar infromacion de pokemon 
function llenarInfo(name, sprites, stats, types) {
    let input = document.getElementById('input_pokemon')
    input.placeholder = 'Ejemplo: ' +name
    let div= $('.datos_pokemon')
    div.empty()

    // Creando tabla con recorrido de elementos
    let tablaInfo = (`<table class="table"> <tr><td class="negrita">Nombre: ${name}</td></tr>`)
    for(let i = 0; i < stats.length; i++) {
        tablaInfo+= ('<tr>')
        tablaInfo+= (`<td>${stats[i].stat.name}</td>`)
        tablaInfo+= (`<td>${stats[i].base_stat}</td>`)
        tablaInfo+= ('</tr>')
    }
    tablaInfo += ('</table>')  
    // Agregar al div
    div.append(tablaInfo)


    let tablaTipo = (`<table class="table"> <tr><td class="negrita"> TIPO:</td>`)
    for(let i = 0; i < types.length; i++) {
        tablaTipo+= (`<td class="negrita">${types[i].type.name}</td>`) 
    }
    tablaTipo+=('</tr> </table>')

    div.append(tablaTipo)


    // Colocar la imagen
    let imagen = document.getElementById('pokemon_img')
    imagen.src=sprites.other.dream_world.front_default

}
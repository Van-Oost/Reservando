var Listado = function(restaurantes) {
    this.restaurantes = restaurantes;
}

Listado.prototype.reservarUnHorario = function(id, horario) {
    //Busca el objeto que posee el id dado
    var restaurant = this.buscarRestaurante(id);
    //Le envía el mensaje al objeto encontrado para que reserve el horario
    restaurant.reservarHorario(horario);
}

Listado.prototype.calificarRestaurant = function(id, calificacion) {
    //Busca el objeto que posee el id dado
    var restaurant = this.buscarRestaurante(id);
    //Le envía el mensaje al objeto encontrado para que agregue la nueva calificación
    restaurant.calificar(calificacion);
}

//Dado un id, busca el objeto del listado que tiene ese id
Listado.prototype.buscarRestaurante = function(id) {

return this.restaurantes.find( restaurante => restaurante.id === id) || "No se ha encontrado ningún restaurant";

}

//Obtiene todas las ciudades de los restaurantes sin repetidos
Listado.prototype.obtenerCiudad = function() {
    
    var ciudades = this.restaurantes.map(restaurant => restaurant.ubicacion);
    return limpiarRepetidos(ciudades).sort();
};

//Obtiene todos los rubros de los restaurantes sin repetidos. Su funcionamiento es similar a obtenerCiudad()
Listado.prototype.obtenerRubro = function() {
    
    var rubros = this.restaurantes.map(restaurant => restaurant.rubro);
    return limpiarRepetidos(rubros).sort();
};


Listado.prototype.obtenerHorario = function() {
    
    var horariosTodos = this.restaurantes.map(restaurant => restaurant.horarios);
    var horariosPlanos = [].concat(...horariosTodos);
    return limpiarRepetidos(horariosPlanos).sort();
};


function limpiarRepetidos(arregloSinLimpiar){
        var arreglolimpio = arregloSinLimpiar.reduce(function (accumulator, currentValue) {
            if (accumulator.indexOf(currentValue) === -1) {
              accumulator.push(currentValue);
            }
            return accumulator
          }, []);
        return arreglolimpio;
};


//Función que recibe los filtros que llegan desde el HTML y filtra el arreglo de restaurantes.
//Solo se filtra si el valor recibido es distinto de null.
Listado.prototype.obtenerRestaurantes = function(filtroRubro, filtroCiudad, filtroHorario) {
    var restaurantesFiltrados = this.restaurantes;
    if (filtroRubro !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(restaurant => restaurant.rubro == filtroRubro);
    }

    if (filtroCiudad !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(restaurant => restaurant.ubicacion == filtroCiudad);
    }

    if (filtroHorario !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(function(res) {
            return res.horarios.some(horario => horario == filtroHorario);
        });
    }
    return restaurantesFiltrados;
}

//Se crea el listado de restaurantes de la aplicación. Si queres agregar un restaurante nuevo, podes agregarlo desde aca, siempre
//verificando que no se repita el id que agregues.

var listadoDeRestaurantes = [
    new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
    new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
    new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
    new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
    new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
    new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
    new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
    new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
    new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
    new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]),
    new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]),
    new Restaurant(12, "Just Salad", "Ensalada", "Nueva York", ["12:00", "15:00", "17:30"], "../img/ensalada3.jpg", [8, 1, 4, 5, 5, 7]),
    new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7, ]),
    new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
    new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]),
    new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]),
    new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
    new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8, 8, 8, 4, 6, 7]),
    new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7]),
    new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]),
    new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]),
    new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
    new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
    new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
];

//Se crea un nuevo listado, asignandole el listado de restaurantes creado anteriormente.
var listado = new Listado(listadoDeRestaurantes)
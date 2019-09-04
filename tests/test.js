var expect = chai.expect;

describe("Probando la función reservarHorario(horario)", function(){

    var restaurant;
    var arrayAnterior
    beforeEach(function() {
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        arrayAnterior =  [...restaurant.horarios];   
    }); 
         


    it("Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.", function(){
        
        restaurant.reservarHorario( "11:30" );
        expect( restaurant.horarios ).not.to.include("11:30");

    });
    


    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.", function(){
        
        restaurant.reservarHorario( "19:30" );
        expect( restaurant.horarios ).to.eql( arrayAnterior );

    });
    


    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function(){
        
        restaurant.reservarHorario();
        expect( restaurant.horarios ).to.eql( arrayAnterior );
        
    });
    


    it("La cantidad de elementos del arreglo disminuye según corresponde.", function(){
        
        restaurant.reservarHorario( "11:30" );
        expect( restaurant.horarios.length ).to.eql( (arrayAnterior.length)-1 );

    });
    

    it("La cantidad de elementos del arreglo no disminuye si el horario no existe.", function(){
        
        restaurant.reservarHorario( "19:30" );
        expect( restaurant.horarios.length ).to.eql( arrayAnterior.length );

    });

    it("El arreglo se mantiene igual, exactamente con los mismos elementos.", function(){
        
        restaurant.reservarHorario();
        expect( restaurant.horarios ).to.eql( arrayAnterior );

    });
    

});

describe("Probando la función obtenerPuntuacion()", function(){

    var restaurant;
    beforeEach(function() {
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);  
    }); 

    it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.", function(){
        
        restaurant.calificaciones = [1,2,3,4,5];
        expect( restaurant.obtenerPuntuacion() ).to.eql( 3 );

    });

    it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.", function(){
        
        restaurant.calificaciones = [];
        expect( restaurant.obtenerPuntuacion() ).to.eql( 0 );

    });
});

describe("Probando la función calificar(nuevaCalificacion)", function(){

    var restaurant;
    var calificacionesAnteriores;
    beforeEach(function() {
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        calificacionesAnteriores = [...restaurant.calificaciones]   
    }); 

    it("La nueva calificacion se agrega exitosamente a la lista de calificaciones", function(){
        
        restaurant.calificar(8)
        var ultimaCalificacion = restaurant.calificaciones.pop()
        expect( ultimaCalificacion ).to.eql( 8 );

    });


    it("Si no se califica con ningun valor, no se agrega nada a la lista", function(){
        
        restaurant.calificar(0)
        expect( restaurant.calificaciones.length).to.eql( calificacionesAnteriores.length );

    });

    it("Si se califica con una palabra, no se agrega nada a la lista", function(){
        
        restaurant.calificar("perro")
        expect( restaurant.calificaciones.length).to.eql( calificacionesAnteriores.length );

    });

    it("Si se califica con un numero negativo, no se agrega nada a la lista", function(){
        
        restaurant.calificar(-9)
        expect( restaurant.calificaciones.length).to.eql( calificacionesAnteriores.length );

    });




});

describe("Probando la función buscarRestaurante(id)", function(){

    var busqueda;
    var restaurant;
    beforeEach(function() {
        var restaurantes = [
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
        var listadoDePrueba = new Listado(restaurantes);
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        busqueda = listadoDePrueba.buscarRestaurante.bind(listado)
    });


    it("Al ingresar un ID retorna ese mismo ID de la Lista", function(){
        
        expect( busqueda(3) ).to.eql( restaurant );

    });

    it("Al ingresar un ID vacio retorna: No se ha encontrado ningún restaurant", function(){
        
        expect( busqueda() ).to.eql( "No se ha encontrado ningún restaurant" );

    });


    it("Al ingresar un ID inexistente retorna: No se ha encontrado ningún restaurant", function(){
        
        expect( busqueda(859) ).to.eql( "No se ha encontrado ningún restaurant" );

    });


    it("Al ingresar una palabra como ID retorna: No se ha encontrado ningún restaurant", function(){
        
        expect( busqueda("ornitorrinco") ).to.eql( "No se ha encontrado ningún restaurant" );

    });

  

});

describe("Probando la obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)", function(){

    var resultadoFiltrado;
    var restaurantes = [
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
    var listadoDePrueba = new Listado(restaurantes);

    it("Ingresando los parametros correctos retorna el restaurante correcto", function(){
        
        resultadoFiltrado = [new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10])];
        
        expect( listadoDePrueba.obtenerRestaurantes("Desayuno", "París", "14:30") ).to.eql( resultadoFiltrado );

    });

    it("Ingresando los parametros correctos retorna la lista correcta de multiples restaurantes", function(){
        
        resultadoFiltrado = [
            new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
            new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7])
        ];

        expect( listado.obtenerRestaurantes("Desayuno", "París", "19:00") ).to.eql( resultadoFiltrado );

    });

    it("Ingresando un horario incorrecto no retorna nada", function(){
        
        expect( listadoDePrueba.obtenerRestaurantes("Desayuno", "París", "00:00") ).to.eql( [] );

    });
    
    it("Ingresando una ciudad incorrecta no retorna nada", function(){
        
        expect( listadoDePrueba.obtenerRestaurantes("Desayuno", "Ornitorrinco", "19:00") ).to.eql( [] );

    });

    
    it("Ingresando un rubro incorrecto no retorna nada", function(){
        
        expect( listadoDePrueba.obtenerRestaurantes("Mandril", "París", "19:00") ).to.eql( [] );

    });

    it("Ingresando un horario vacio no retorna nada", function(){
        
        expect( listadoDePrueba.obtenerRestaurantes("Desayuno", "París", "") ).to.eql( [] );

    });

    it("Ingresando un rubro vacio no retorna nada", function(){
        
        expect( listadoDePrueba.obtenerRestaurantes("", "París", "19:00") ).to.eql( [] );

    });

    it("Ingresando una ciudad vacia no retorna nada", function(){
        
        expect( listadoDePrueba.obtenerRestaurantes("Desayuno", "", "19:00") ).to.eql( [] );

    });

});

describe("Probando la Reserva", function(){

    var reserva1;
    var reserva2;
    
    beforeEach(function() {
        reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    });
    

    it("Comprueba que un restaurante calcule correctamente su precio base.", function(){
        
        expect( reserva1.precioBase() ).to.eql( 2800 );

    });


    it("Comprueba que un restaurante calcule correctamente su precio base.", function(){
        
        expect( reserva2.precioBase() ).to.eql( 300 );

    });


    it("Comprueba que un restaurante calcule correctamente su precio final, contemplando bien los descuentos y los adicionales.", function(){
        
        expect( reserva1.precioFinal() ).to.eql( 2450 );

    });


    it("Comprueba que un restaurante calcule correctamente su precio final, contemplando bien los descuentos y los adicionales.", function(){
        
        expect( reserva2.precioFinal() ).to.eql( 100 );

    });

});
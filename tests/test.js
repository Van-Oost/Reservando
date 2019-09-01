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
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        busqueda = listado.buscarRestaurante.bind(listado)
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

    it("Ingresando los parametros correctos retornael restaurante correcto", function(){
        
        resultadoFiltrado = [new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10])];
        
        expect( listado.obtenerRestaurantes("Desayuno", "París", "14:30") ).to.eql( resultadoFiltrado );

    });

    it("Ingresando los parametros correctos retorna la lista correcta de multiples restaurantes", function(){
        
        resultadoFiltrado = [
            new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
            new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7])
        ];

        expect( listado.obtenerRestaurantes("Desayuno", "París", "19:00") ).to.eql( resultadoFiltrado );

    });

    it("Ingresando un horario incorrecto no retorna nada", function(){
        
        expect( listado.obtenerRestaurantes("Desayuno", "París", "00:00") ).to.eql( [] );

    });
    
    it("Ingresando una ciudad incorrecta no retorna nada", function(){
        
        expect( listado.obtenerRestaurantes("Desayuno", "Ornitorrinco", "19:00") ).to.eql( [] );

    });

    
    it("Ingresando un rubro incorrecto no retorna nada", function(){
        
        expect( listado.obtenerRestaurantes("Mandril", "París", "19:00") ).to.eql( [] );

    });

    it("Ingresando un horario vacio no retorna nada", function(){
        
        expect( listado.obtenerRestaurantes("Desayuno", "París", "") ).to.eql( [] );

    });

    it("Ingresando un rubro vacio no retorna nada", function(){
        
        expect( listado.obtenerRestaurantes("", "París", "19:00") ).to.eql( [] );

    });

    it("Ingresando una ciudad vacia no retorna nada", function(){
        
        expect( listado.obtenerRestaurantes("Desayuno", "", "19:00") ).to.eql( [] );

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
        
        expect( reserva1.precioFinal() ).to.eql( 2310 );

    });


    it("Comprueba que un restaurante calcule correctamente su precio final, contemplando bien los descuentos y los adicionales.", function(){
        
        expect( reserva2.precioFinal() ).to.eql( 100 );

    });

});
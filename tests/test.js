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
        arrayAnterior =  [...restaurant.horarios];
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

    var restaurant;
    beforeEach(function() {
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        arrayAnterior =  [...restaurant.horarios];   
    }); 

    it("Prueba 1", function(){
        
        restaurant.calificaciones = [1,2,3,4,5];
        expect( restaurant.obtenerPuntuacion() ).to.eql( 588 );

    });

});

describe("Probando la obtenerRestaurantes()", function(){

    var restaurant;
    beforeEach(function() {
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        arrayAnterior =  [...restaurant.horarios];   
    }); 

    it("Prueba 1", function(){
        
        restaurant.calificaciones = [1,2,3,4,5];
        expect( restaurant.obtenerPuntuacion() ).to.eql( 588 );

    });

});

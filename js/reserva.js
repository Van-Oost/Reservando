var Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
};


// Calcula el precio Final
Reserva.prototype.precioFinal = function(){
 
    return this.precioBase() + this.adicionales() - this.descuentos();

};


// Calcula el precio Base
Reserva.prototype.precioBase = function(){
 
    return this.cantidadPersonas * this.precioPersona;

};


//Calcula los adicionales
Reserva.prototype.adicionales = function(){
    return adicionalHorario(this) + adicionalFinde(this);
};


// Calcula los descuentos
Reserva.prototype.descuentos = function(){

    return descuentoGrupos(this) + descuentoCodigo(this);
};


// Dado un total y un %, calcula el importe
function calcularPorcentaje(total, porcentaje) {
    return (total/100)*porcentaje;
};


// Calcjula los descuentos por Grupo
function descuentoGrupos(estaReserva){

    var cantidad = estaReserva.cantidadPersonas;
    var porcentajeDescuento = 0;
    if ((cantidad >= 4) && (cantidad <= 6)){
        porcentajeDescuento =  5;
    };
    if ((cantidad >= 7) && (cantidad <= 8)){
        porcentajeDescuento =  10;
    };
    if (cantidad > 8){
        porcentajeDescuento =  15;
    };
    return calcularPorcentaje(estaReserva.precioBase(), porcentajeDescuento);
};


// Calcula el descuento por Codigo
function descuentoCodigo(estaReserva){
    
    var cod = estaReserva.codigoDescuento;
        
        if (cod==="DES15"){
            return calcularPorcentaje(estaReserva.precioBase(), 15);
        };
        if (cod==="DES200"){
            return 200;
        };
        if (cod==="DES1"){
            return estaReserva.precioPersona;
        };
        return 0;
};


// Calcula si hay adicionales segun una franja horaria
function adicionalHorario(estaReserva){
    var hora = estaReserva.horario.getHours();
    if (((hora >= 13) && (hora <= 14)) || ((hora >= 20) && (hora <= 21))){
        return calcularPorcentaje(estaReserva.precioBase(), 5);
    };
    return 0;
};


// Calcula si hay adicionales por fin de semana
function adicionalFinde(estaReserva){
    var diaSemana = estaReserva.horario.getDay();
    if ((diaSemana == 5) || (diaSemana == 6) || (diaSemana == 7)){
        return calcularPorcentaje(estaReserva.precioBase(), 10);
    };
    return 0;
};

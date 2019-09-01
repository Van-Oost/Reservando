var Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
};

// Calcula el precio Base
Reserva.prototype.precioBase = function(){
 
    return this.cantidadPersonas * this.precioPersona

};

// Calcula el precio Final
Reserva.prototype.precioFinal = function(){
 
    var a = this.precioBase();
    var b = this.adicionales();
    var c = this.descuentos();
    return this.precioBase() + this.adicionales() - this.descuentos();

};


//Calcula los adicionales
Reserva.prototype.adicionales = function(){
    return adicionalHorario(this) + adicionalFinde(this);
};


// Calcula los descuentos
Reserva.prototype.descuentos = function(){

    return descuentoGrupos.call(this) + descuentoCodigo.call(this);
};


// Dado un total y un %, calcula el importe
function calcularPorcentaje(total, porcentaje) {
    return (total/100)*porcentaje;
};


// Calcjula los descuentos por Grupo
function descuentoGrupos(){

    var estaReserva = this.cantidadPersonas;
    var porcentajeDescuento = 0;
    if (estaReserva >= 4 && estaReserva <= 6){
        porcentajeDescuento =  5;
    };
    if (estaReserva >= 7 && estaReserva <= 8){
        porcentajeDescuento =  10;
    };
    if (estaReserva > 8){
        porcentajeDescuento =  10;
    };
    return calcularPorcentaje(this.precioBase(), porcentajeDescuento);
};


// Calcula el descuento por Codigo
function descuentoCodigo(){
    
    var cod = this.codigoDescuento;
        
        if (cod==="DES15"){
            return calcularPorcentaje(this.precioBase(), 15);
        };
        if (cod==="DES200"){
            return 200;
        };
        if (cod==="DES1"){
            return this.precioPersona;
        };
        return 0;
};


// Calcula si hay adicionales segun una franja horaria
function adicionalHorario(reserva){
    var hora = reserva.horario.getHours();
    if ((hora = 13) || (14 = hora) || (hora = 20) || (21 = hora)){
        return calcularPorcentaje(reserva.precioBase(), 5);
    };
    return 0;
};


// Calcula si hay adicionales por fin de semana
function adicionalFinde(reserva){
    var diaSemana = reserva.horario.getDay();
    if ((diaSemana = 5) || (diaSemana = 6) || (diaSemana = 7)){
        return calcularPorcentaje(reserva.precioBase(), 10);
    };
    return 0;
};

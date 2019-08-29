var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(horario => horario !== horarioReservado); 
};

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
};

Restaurant.prototype.obtenerPuntuacion = function() {

    var promedioCalificaciones = promedio(this.calificaciones);
    if (isNaN(promedioCalificaciones)) {
        return 0};
    return Math.round(promedioCalificaciones);

}

function sumatoria(numeros){

    return numeros.reduce((a,b) => a + b, 0);
};

function promedio(numeros){

     return sumatoria(numeros)/numeros.length
};


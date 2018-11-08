export class Registracion {
    id: number;
    usuario: string;
    fecha: Date | string;
    hora: string;
    // clasificacion: string;
    descripcion: string;
    adjuntos: string[];
    constructor(
        id: number = 0,
        usuario: string = "",
        fecha: Date | string = new Date(),
        hora: string = "",
        // clasificacion: string = "",
        descripcion: string = "",
        adjuntos: string[] = []) {
        this.id = id;
        this.usuario = usuario;
        this.fecha = fecha;
        this.hora = hora;
        // this.clasificacion = clasificacion;
        this.descripcion = descripcion;
        this.adjuntos = adjuntos;
    }
}
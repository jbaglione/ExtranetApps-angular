import { Adjunto } from "./adjunto.model";

export class Registracion {
    id: number;
    usuario: string;
    fecha: Date | string;
    hora: string;
    descripcion: string;
    adjuntos: Adjunto[];
    constructor(
        id: number = 0,
        usuario: string = "",
        fecha: Date | string = new Date(),
        hora: string = "",
        descripcion: string = "",
        adjuntos: Adjunto[] = []) {
        this.id = id;
        this.usuario = usuario;
        this.fecha = fecha;
        this.hora = hora;
        this.descripcion = descripcion;
        this.adjuntos = adjuntos;
    }
}
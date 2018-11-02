import { Registracion } from "./registracion.model";
import { Destino } from "./destino.model";
import { getLocaleDateTimeFormat } from "@angular/common";

export class Hallazgo
{
    id: number;
    nro: number;
    fecha: Date | string;
    hora: string;
    titulo: string;
    clasificacion: number;
    motivo: number;
    administrador: string;
    estado: number; //0 = ,1 = pendiente,2 = finalizado
    ultFecha: Date | string;
    diasRta: number;
    duracion: number;
    registraciones: Registracion[];
    destinos: Destino[];
    constructor(
        id: number = 0,
        nro: number = 0,
        fecha: Date |string = new Date(),
        hora: string = "",
        titulo: string= "",
        clasificacion: number= 0,
        motivo: number= 0,
        administrador: string= "",
        estado: number = 0,
        ultFecha: Date | string= "",
        diasRta: number = 0,
        duracion: number = 0,
        registraciones:Registracion[]=[new Registracion()],
        destinos: Destino[]=[new Destino()],
    )
    {
        this.id = id;
        this.nro = nro;
        this.fecha = fecha;
        this.hora = hora;
        this.titulo = titulo;
        this.clasificacion = clasificacion;
        this.motivo = motivo;
        this.administrador = administrador;
        this.estado = estado;
        this.ultFecha = ultFecha;
        this.diasRta = diasRta;
        this.duracion = duracion;
        this.registraciones = registraciones;
        this.destinos = destinos;
    }
}
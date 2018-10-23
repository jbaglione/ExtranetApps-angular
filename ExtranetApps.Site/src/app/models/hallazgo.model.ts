import { Registracion } from "./registracion.model";
import { Destino } from "./destino.model";

export class Hallazgo
{
    id: number;
    nro: number;
    fecha: Date | string;
    hora: string;
    titulo: string;
    motivo: string;
    administrador: string;
    estado: number; //0 = ,1 = pendiente,2 = finalizado
    ultfecha: Date | string;
    diasrta: number;
    duracion: number;
    registraciones: Registracion[];
    destinos: Destino[];
    constructor(
        id: number = 0,
        nro: number = 0,
        fecha: Date |string = "",
        hora: string = "",
        titulo: string= "",
        motivo: string= "",
        administrador: string= "",
        estado: number = 0,
        ultfecha: Date | string= "",
        diasrta: number = 0,
        duracion: number = 0,
        registraciones: Registracion[],
        destinos: Destino[]
    )
    {
        this.id = id;
        this.nro = nro;
        this.fecha = fecha;
        this.hora = hora;
        this.titulo = titulo;
        this.motivo = motivo;
        this.administrador = administrador;
        this.estado = estado;
        this.ultfecha = ultfecha;
        this.diasrta = diasrta;
        this.duracion = duracion;
        this.registraciones = registraciones;
        this.destinos = destinos;
    }
}
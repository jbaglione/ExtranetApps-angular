export class Registracion
{
    id: number;
    usuario: string;
    fecha: Date | string;
    hora: Date | string;
    clasificacion: number;
    descripcion: string;
    adjunto: string;
    constructor (
            id: number = 0,
            usuario: string = "aaaa",
            fecha: Date |string = "",
            hora: string = "",
            clasificacion:  number = 0,
            descripcion: string = "",
            adjunto: string= "")
            {
                this.id = id;
                this.usuario = usuario,
                this.fecha = fecha;
                this.hora = hora;               
                this.clasificacion = clasificacion;
                this.descripcion = descripcion;
                this. adjunto = adjunto;
            }
    
}


import { listable } from "./listable.model";
import { ClienteAdjuntos } from "./clienteAdjuntos.model";

export class ClientesGestion {
    Id: number;
    clienteId: number;
    tipoGestion: listable;
    observaciones: string;
    // pdfgestion:byte[];
    fecha: Date | string;
    fechaRecontacto: Date | string;
    fulldescription: string;
    adjunto: ClienteAdjuntos;

    constructor
        (
            Id: number = 0,
            clienteId: number = 0,
            tipoGestion: listable = new listable("", ""),
            observaciones: string = "",
            fecha: Date | string = new Date(),
            fechaRecontacto: Date | string = new Date(),
            fulldescription: string = "",
            adjunto: ClienteAdjuntos = new ClienteAdjuntos()
        ) {
        this.Id = Id;
        this.clienteId = clienteId;
        this.tipoGestion = tipoGestion;
        this.observaciones = observaciones;
        this.fecha = fecha;
        this.fechaRecontacto = fechaRecontacto;
        this.fulldescription = fulldescription;
        this.adjunto = adjunto;
    }
}
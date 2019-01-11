import { Rubro } from "./rubro.model";
import { CondicionIVA } from "./condicionIVA.model";
import { Localidad } from "./localidad.model";

export class ClientePotencial {
    clienteId: number;
    nombreComercial: string;
    rubroObj: Rubro;
    razonSocial: string;
    cuit: string;
    cuitNumber: number;
    condicionIVAObj: CondicionIVA;
    latitud: string;
    longitud: string;
    domicilio: string;
    calle: string;
    altura: number;
    piso: number;
    depto: string;
    referencia: string;
    entreCalle1: string;
    entreCalle2: string;
    codigoPostal: string;
    localidadObj: Localidad;
    estado: number; //todo: potencial = 1, activo = 2, inactivo = 3
    credencialId: string;//todo: potencial no tienen codigocliente
    constructor
        (
            clienteId: number = 0,
            nombreComercial: string = "",
            rubro: Rubro = new Rubro(),
            razonSocial: string = "",
            cuit: string = "",
            cuitNumber: number = 0,
            condicionIVA: CondicionIVA = new CondicionIVA(),
            latitud: string = "",
            longitud: string = "",
            domicilio: string = "",
            calle: string = "",
            altura: number = 0,
            piso: number = 0,
            depto: string = "",
            referencia: string = "",
            entreCalle1: string = "",
            entreCalle2: string = "",
            codigoPostal: string = "",
            localidad: Localidad = new Localidad(),
            estado: number = 0, //todo: potencial = 1, activo = 2, inactivo = 3
            credencialId: string = "",//todo: potencial no tienen codigocliente
    ) {
        this.clienteId = clienteId;
        this.nombreComercial = nombreComercial;
        this.rubroObj = rubro;
        this.razonSocial = razonSocial;
        this.cuit = cuit;
        this.cuitNumber = cuitNumber;
        this.condicionIVAObj = condicionIVA;
        this.latitud = latitud;
        this.longitud = longitud;
        this.domicilio = domicilio;
        this.calle = calle;
        this.altura = altura;
        this.piso = piso;
        this.depto = depto;
        this.referencia = referencia;
        this.entreCalle1 = entreCalle1;
        this.entreCalle2 = entreCalle2;
        this.codigoPostal = codigoPostal;
        this.localidadObj = localidad;
        this.estado = estado;
        this.credencialId = credencialId; //nro de cliente
    }
}

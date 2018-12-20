export class Usuario {
    id: number;
    identificacion: string;
    nombre: string;
    password: string;
    email:string
    fecNacimiento: string;
    acceso: string;
    empresa: string;
    situacion: boolean;
    token?: string;

    constructor(
        id: number = 0,
        email: string = "",
        fecNacimiento: string = "",
        nombre: string = "",
        identificacion: string = "",
        acceso: string = "",
        empresa: string = "",
        situacion: boolean = true,
        url: string = "",
        token: string = "") {
        this.id = id;
        this.email = email;
        this.fecNacimiento = fecNacimiento;
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.acceso = acceso;
        this.empresa = empresa;
        this.situacion = situacion;
        this.token = token;
    }
}
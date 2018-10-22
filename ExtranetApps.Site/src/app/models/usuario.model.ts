// export interface Usuario
// {
//     ID: number;
//     NombreUsuario: string;
//     FecHasta: string;
//     btnAgregar: string;
//     btnAutorizar: string;
//     headerStyle: string;
// }

export class Usuario {
    ID: number;
    NombreUsuario: string;
    FecHasta: string;
    btnAgregar: string;
    btnAutorizar: string;
    headerStyle: string;

    constructor(ID: number = 0,
        NombreUsuario: string = "",
        FecHasta: string = "",
        btnAgregar: string = "",
        btnAutorizar: string = "",
        headerStyle: string= "") {
            this.ID = ID;
            this.NombreUsuario= NombreUsuario;
            this.FecHasta= FecHasta;
            this.btnAgregar = btnAgregar;
            this.btnAutorizar= btnAutorizar;
            this.headerStyle= headerStyle;
        }

  }
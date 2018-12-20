namespace ExrtanetApps.Security.Entities
{
    public class User
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string FecNacimiento { get; set; }
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Password { get; set; }
        public string Acceso { get; set; } //Deberia ser list<dictionary> key=sitio, value=acceso
        public string Empresa { get; set; }
        public string Situacion { get; set; }
        public string Token { get; set; }
        //acceso: string;
        //empresa: string;
        //titulo: string;
        //url: string;

        //public string regAplicacionId { get; set; }
        //public string regCentroOperativoId { get; set; }
        //public string regFechaHora { get; set; }
        //public string regPID { get; set; }
        //public string regPerfilId { get; set; }
        //public string regTerminalId { get; set; }
        //public string regUsuarioId { get; set; }
    }

    public class UserBase64
    {
        public int Id { get; set; }
        public string Base64 { get; set; }
    }
}
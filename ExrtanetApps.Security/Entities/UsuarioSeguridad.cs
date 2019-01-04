using System.Collections.Generic;

namespace ExrtanetApps.Security.Entities
{
    public class UsuarioSeguridad/*: Extranet.Usuarios*/
    {
        public long ID { get; set; }
        public string Email { get; set; }
        public string FecNacimiento { get; set; }
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Password { get; set; }
        public string Situacion { get; set; }

        public string Acceso { get; set; } //Deberia ser list<dictionary> key=sitio, value=acceso
        public string Empresa { get; set; }

        public string Token { get; set; }
        public List<string> Parametros { get; set; }//Lista de parametros por micrositio.
        public string Micrositio { get; set; }
    }

    public class UserBase64
    {
        public int Id { get; set; }
        public string Base64 { get; set; }
    }
}
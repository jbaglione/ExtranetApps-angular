using Microsoft.EntityFrameworkCore;

namespace ExtranetApps.Api.Models
{
    public class ExtranetAppsContext : DbContext
    {
        public ExtranetAppsContext(DbContextOptions<ExtranetAppsContext> options)
            : base(options)
        {
        }

        public DbSet<Hallazgo> HallazgoItems { get; set; }
        public DbSet<Destino> DestinoItems { get; set; }
        public DbSet<Registracion> RegistracionItems { get; set; }

        public DbSet<Motivo> MotivoItems { get; set; }
        public DbSet<Estado> EstadoItems { get; set; }
        public DbSet<Clasificacion> ClasificacionItems { get; set; }
    }
}
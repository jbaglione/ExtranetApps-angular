using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ExtranetApps.Api.Models;

namespace ExtranetApps.Api
{
    
    public class Startup
    {
        

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ExtranetAppsContext>(opt => 
                opt.UseInMemoryDatabase("HallazgoList"));
            services.AddMvc()
                    .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddCors(o => o.AddPolicy("MyPolicyAllowAny", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMvc();
        }
    }
}
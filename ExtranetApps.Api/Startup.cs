using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ExtranetApps.Api.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using System;

namespace ExtranetApps.Api
{
    
    public class Startup
    {

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ExtranetAppsContext>(opt =>
                opt.UseInMemoryDatabase("HallazgoList"));

            services.AddMvc();
            //        .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddCors();

            services.AddCors(o => o.AddPolicy("MyPolicyAllowAny", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            var key = Encoding.ASCII.GetBytes("ExrtanetApps.Security_01");
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    //ValidateLifetime = true,//validate exp?

                    ValidateLifetime = true,
                    //ValidateIssuer = true,
                    //ValidateAudience = true,
                    ClockSkew = TimeSpan.Zero

                };
            });
        }

        //public Startup(IConfiguration configuration)
        //{
        //    Configuration = configuration;
        //}

        //public IConfiguration Configuration { get; }

       
        public void Configure(IApplicationBuilder app)
        {
            app.UseCors(x => x
                   .AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials());

            app.UseAuthentication();

            app.UseMvc();
            
        }
    }
}
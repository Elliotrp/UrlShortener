namespace UrlShortener;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using UrlShortener.Models;
using Microsoft.EntityFrameworkCore;
using UrlShortener.Services;
using Polly;
using Polly.Retry;
using System;

public class Startup
{
	public Startup(IConfiguration configuration)
	{
		Configuration = configuration;
	}

	public IConfiguration Configuration { get; }

	public void ConfigureServices(IServiceCollection services)
	{
		services.AddResiliencePipeline("db-retry-pipeline", builder =>
		{
			builder.AddRetry(new RetryStrategyOptions
			{
				ShouldHandle = new PredicateBuilder().Handle<DbUpdateException>(),
				Delay = TimeSpan.Zero,
				MaxRetryAttempts = 2
			});
		});

		services.AddDbContext<UrlShortenerDbContext>(options =>
			 options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

		services.AddControllers();
		services.AddSwaggerGen(c =>
		{
			c.SwaggerDoc("v1", new OpenApiInfo { Title = "UrlShortener", Version = "v1" });
		});

		services.AddScoped<IUrlService, UrlService>();
		services.AddScoped<IUrlAccessService, UrlAccessService>();
		services.AddScoped<IUrlAccessConverter, UrlAccessConverter>();

		services.AddCors();
	}

	public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		if (env.IsDevelopment())
		{
			app.UseDeveloperExceptionPage();
			app.UseSwagger();
			app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "UrlShortener v1"));

			app.UseCors(builder => builder
				.WithOrigins("http://localhost:4200")
				.AllowAnyMethod()
				.AllowAnyHeader());
		}
		else
		{
			app.UseCors(builder => builder
				.WithOrigins("https://linklockr.uk")
				.AllowAnyMethod()
				.AllowAnyHeader());
		}

		app.UseRouting();

		app.UseAuthorization();

		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}

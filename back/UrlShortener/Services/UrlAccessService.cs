namespace UrlShortener.Services;

using System;
using UrlShortener.Models;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using UrlShortener.Dtos;

public class UrlAccessService : IUrlAccessService
{
   private readonly ILogger<IUrlService> logger;
   private readonly UrlShortenerDbContext context;

   public UrlAccessService(ILogger<IUrlService> logger,
   UrlShortenerDbContext context)
   {
      this.logger = logger;
      this.context = context;
   }

   public async Task CreateUrlAccess(CreateUrlAccessRequest request)
   {
      UrlAccess newUrlAccess = new UrlAccess
      {
         UrlId = request.Url.Id,
         AccessedDate = DateTime.UtcNow,
         Browser = request.Browser,
         DeviceType = request.DeviceType,
         OperatingSystem = request.OperatingSystem,
         Location = request.Location,
         Authorised = request.Authorised,
         Country = request.Country
      };
      this.context.UrlAccesses.Add(newUrlAccess);
      await this.context.SaveChangesAsync();
   }
}

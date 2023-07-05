namespace UrlShortener.Services;

using System;
using UrlShortener.Models;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

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

   public async Task CreateUrlAccess(Url url)
   {
      UrlAccess newUrlAccess = new UrlAccess
      {
         UrlId = url.Id,
         AccessedDate = DateTime.UtcNow
      };
      this.context.UrlAccesses.Add(newUrlAccess);
      await this.context.SaveChangesAsync();
   }
}

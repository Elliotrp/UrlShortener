namespace UrlShortener.Services;

using System;
using UrlShortener.Models;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using UrlShortener.Dtos;
using Microsoft.EntityFrameworkCore;

public class UrlAccessService : IUrlAccessService
{
   private readonly ILogger<IUrlAccessService> logger;
   private readonly UrlShortenerDbContext context;

   public UrlAccessService(ILogger<IUrlAccessService> logger,
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

   public async Task<UrlAccessesResponse> GetUrlAccessesByUrl(GetUrlAccessesByUrlRequest request)
   {
      UrlAccessesResponse response = new UrlAccessesResponse();

      try
      {
         Url url = await this.context.Urls.Include(u => u.UrlAccesses).FirstOrDefaultAsync(u => u.ShortUrl == request.ShortKey);

         if (url is null)
         {
            Error error = new Error
            {
               ErrorCode = ErrorCode.UrlNotFound,
               ErrorMessage = $"Url with {nameof(request.ShortKey)} {request.ShortKey} was not found"
            };
            this.logger.LogError(error.ErrorCode.ToString(), error.ErrorMessage);
            response.Error = error;
         }
         else
         {
            response.UrlAccesses = url.UrlAccesses;
         }

      }
      catch (Exception ex)
      {
         this.logger.LogError(ex, ex.Message);
         response.Error = new Error
         {
            ErrorCode = ErrorCode.GetError,
            ErrorMessage = "An error occurred while retrieving the data. Please try again later."
         };
      }

      return response;
   }
}

namespace UrlShortener.Services;

using System;
using System.Linq;
using UrlShortener.Models;
using UrlShortener.Dtos;
using UrlShortener.Helpers;
using Microsoft.Extensions.Logging;

public class UrlService : IUrlService
{
    private readonly ILogger<IUrlService> logger;
   private readonly UrlShortenerDbContext context;

   public UrlService(ILogger<IUrlService> logger,
   UrlShortenerDbContext context)
   {
      this.logger = logger;
      this.context = context;
   }

   public BaseUrlResponse CreateUrl(CreateUrlRequest request)
   {
      string shortUrl = RandomStringHelper.GetRandomString(5);

      var newEntity = new Url {
            ShortUrl = shortUrl,
            TargetUrl = request.TargetUrl,
            CreatedDate = DateTime.UtcNow
      };

      BaseUrlResponse response = new BaseUrlResponse(newEntity);

      try {
         this.context.Urls.Add(newEntity);
         this.context.SaveChanges();
         response = new BaseUrlResponse(newEntity);
      } catch (Exception ex) {
         this.logger.LogError(ex, ex.Message);
         response.Error = new Error {
            ErrorCode = "SaveError",
            ErrorMessage = "An error occurred while saving the data. Please try again later."
         };
      }

      return response;
   }

   public BaseUrlResponse GetUrl(string shortKey)
   {
      BaseUrlResponse response = new BaseUrlResponse();

      try {
         Url url = this.context.Urls.FirstOrDefault(u => u.ShortUrl == shortKey);
         if (url is null) {
            response.Error = new Error {
               ErrorCode = "UrlNotFound",
               ErrorMessage = $"Url with { nameof(shortKey) } { shortKey } was not found"
            };
         } else {
            response = new BaseUrlResponse(url);
         }
      } catch {
         response.Error = new Error {
            ErrorCode = "GetError",
            ErrorMessage = "An error occurred while retrieving the data. Please try again later."
         };
      }
      
      return response;
   }
}

namespace UrlShortener.Services;

using System;
using System.Linq;
using UrlShortener.Models;
using UrlShortener.Dtos;
using UrlShortener.Helpers;

public class UrlService : IUrlService
{
   private readonly UrlShortenerDbContext context;

   public UrlService(UrlShortenerDbContext context)
   {
      this.context = context;
   }

   public CreateUrlResponse CreateUrl(CreateUrlRequest request)
   {
      string shortUrl = RandomStringHelper.GetRandomString(5);

      var newEntity = new Url {
            ShortUrl = shortUrl,
            TargetUrl = request.TargetUrl,
            CreatedDate = DateTime.UtcNow
      };

      CreateUrlResponse response = new CreateUrlResponse();

      try {
         this.context.Urls.Add(newEntity);
         this.context.SaveChanges();
         response.ShortUrl = shortUrl;
      } catch {
         response.Error = new Error {
            ErrorCode = "SaveError",
            ErrorMessage = "An error occurred while saving the data. Please try again later."
         };
      }

      return response;
   }

   public GetUrlResponse GetUrl(string shortKey)
   {
      GetUrlResponse response = new GetUrlResponse();

      try {
         Url url = this.context.Urls.FirstOrDefault(u => u.ShortUrl == shortKey);
         if (url is null) {
            response.Error = new Error {
               ErrorCode = "UrlNotFound",
               ErrorMessage = $"Url with { nameof(shortKey) } { shortKey } was not found"
            };
         } else {
            response.TargetUrl = url.TargetUrl;
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

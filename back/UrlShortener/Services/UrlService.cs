namespace UrlShortener.Services;

using System;
using UrlShortener.Models;
using UrlShortener.Dtos;
using UrlShortener.Helpers;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

public class UrlService : IUrlService
{
   private readonly ILogger<IUrlService> logger;
   private readonly UrlShortenerDbContext context;

   private readonly IUrlAccessService urlAccessService;

   public UrlService(ILogger<IUrlService> logger,
   UrlShortenerDbContext context,
   IUrlAccessService urlAccessService)
   {
      this.logger = logger;
      this.context = context;
      this.urlAccessService = urlAccessService;
   }

   public async Task<BaseUrlResponse> CreateUrl(CreateUrlRequest request)
   {
      string shortUrl = RandomStringHelper.GetRandomString(5);

      Url newUrl = new Url {
            ShortUrl = shortUrl,
            TargetUrl = request.TargetUrl,
            CreatedDate = DateTime.UtcNow
      };

      BaseUrlResponse response = new BaseUrlResponse(newUrl);

      try {
         this.context.Urls.Add(newUrl);
         await this.context.SaveChangesAsync();
         response = new BaseUrlResponse(newUrl);
      } catch (Exception ex) {
         this.logger.LogError(ex, ex.Message);
         response.Error = new Error {
            ErrorCode = "SaveError",
            ErrorMessage = "An error occurred while saving the data. Please try again later."
         };
      }

      return response;
   }

   public async Task<BaseUrlResponse> GetUrl(string shortKey)
   {
      BaseUrlResponse response = new BaseUrlResponse();

      try {
         Url url = await this.context.Urls.FirstOrDefaultAsync(u => u.ShortUrl == shortKey);
         if (url is null) {
            response.Error = new Error {
               ErrorCode = "UrlNotFound",
               ErrorMessage = $"Url with { nameof(shortKey) } { shortKey } was not found"
            };
            return response;
         } else {
            response = new BaseUrlResponse(url);
            await this.urlAccessService.CreateUrlAccess(url);
         }
      } catch (Exception ex) {
         this.logger.LogError(ex, ex.Message);
         response.Error = new Error {
            ErrorCode = "GetError",
            ErrorMessage = "An error occurred while retrieving the data. Please try again later."
         };
      }
      
      return response;
   }

   public async Task<BaseUrlResponse> SetPassword(int id, string password)
   {
      BaseUrlResponse response = new BaseUrlResponse();

      try {
         Url url = await this.context.Urls.FirstOrDefaultAsync(u => u.Id == id);
         if (url is null) {
            response.Error = new Error {
               ErrorCode = "UrlNotFound",
               ErrorMessage = $"Url with { nameof(id) } { id } was not found"
            };
            return response;
         }

         string hashedPassword = BCrypt.HashPassword(password);
         url.Password = hashedPassword;
         await this.context.SaveChangesAsync();
      } catch (Exception ex) {
         this.logger.LogError(ex, ex.Message);
         response.Error = new Error {
            ErrorCode = "SaveError",
            ErrorMessage = "An error occurred while saving the data. Please try again later."
         };
      }

      return response;
   }
}

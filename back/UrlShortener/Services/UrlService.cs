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

      Url newUrl = new Url
      {
         ShortUrl = shortUrl,
         TargetUrl = request.TargetUrl,
         CreatedDate = DateTime.UtcNow
      };

      BaseUrlResponse response = new BaseUrlResponse(newUrl);

      try
      {
         this.context.Urls.Add(newUrl);
         await this.context.SaveChangesAsync();
         response = new BaseUrlResponse(newUrl);
      }
      catch (Exception ex)
      {
         this.logger.LogError(ex, ex.Message);
         response.Error = new Error
         {
            ErrorCode = ErrorCode.SaveError,
            ErrorMessage = "An error occurred while saving the data. Please try again later."
         };
      }

      return response;
   }

   public async Task<BaseUrlResponse> GetUrl(GetUrlRequest request)
   {
      BaseUrlResponse response = new BaseUrlResponse();

      try
      {
         Url url = await this.context.Urls.FirstOrDefaultAsync(u => u.ShortUrl == request.ShortKey);
         CreateUrlAccessRequest createAccessRequest = new CreateUrlAccessRequest
         {
            Url = url,
            Browser = request.Browser,
            DeviceType = request.DeviceType,
            OperatingSystem = request.OperatingSystem,
            Location = request.Location
         };

         if (url is null)
         {
            Error error = new Error
            {
               ErrorCode = ErrorCode.UrlNotFound,
               ErrorMessage = $"Url with {nameof(request.ShortKey)} {request.ShortKey} was not found"
            };
            this.logger.LogError(error.ErrorCode.ToString(), error.ErrorMessage);
            response.Error = error;
            return response;
         }
         else
         {
            if (!string.IsNullOrEmpty(url.Password) &&
               (string.IsNullOrEmpty(request.Password) ||
               !BCrypt.Verify(request.Password, url.Password)))
            {
               Error error = new Error
               {
                  ErrorCode = ErrorCode.InvalidPassword,
                  ErrorMessage = "The password provided was incorrect"
               };
               this.logger.LogError(error.ErrorCode.ToString(), error.ErrorMessage);
               response.Error = error;
               createAccessRequest.Authorised = false;
            } else {
               response = new BaseUrlResponse(url);
               createAccessRequest.Authorised = true;
            }
            
            await this.urlAccessService.CreateUrlAccess(createAccessRequest);
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

   public async Task<BaseUrlResponse> SetPassword(int id, string password)
   {
      BaseUrlResponse response = new BaseUrlResponse();

      try
      {
         Url url = await this.context.Urls.FirstOrDefaultAsync(u => u.Id == id);
         if (url is null)
         {
            Error error = new Error
            {
               ErrorCode = ErrorCode.UrlNotFound,
               ErrorMessage = $"Url with {nameof(id)} {id} was not found"
            };
            this.logger.LogError(error.ErrorCode.ToString(), error.ErrorMessage);
            response.Error = error;
            return response;
         }

         string hashedPassword = string.IsNullOrEmpty(password) ? null : BCrypt.HashPassword(password);
         url.Password = hashedPassword;
         await this.context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
         this.logger.LogError(ex, ex.Message);
         response.Error = new Error
         {
            ErrorCode = ErrorCode.SaveError,
            ErrorMessage = "An error occurred while saving the data. Please try again later."
         };
      }

      return response;
   }
}

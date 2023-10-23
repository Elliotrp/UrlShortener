namespace UrlShortener.Services;

using System;
using UrlShortener.Models;
using UrlShortener.Dtos;
using UrlShortener.Helpers;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using Polly.Registry;

public class UrlService : IUrlService
{
   private readonly ILogger<IUrlService> logger;
   private readonly UrlShortenerDbContext context;
   private readonly IUrlAccessService urlAccessService;
   private readonly ResiliencePipelineProvider<string> pollyProvider;

   public UrlService(ILogger<IUrlService> logger,
   ResiliencePipelineProvider<string> pollyProvider,
   UrlShortenerDbContext context,
   IUrlAccessService urlAccessService)
   {
      this.logger = logger;
      this.context = context;
      this.urlAccessService = urlAccessService;
      this.pollyProvider = pollyProvider;
   }

   public async Task<BaseUrlResponse> CreateUrl(CreateUrlRequest request)
   {
      var pipeline = this.pollyProvider.GetPipeline("db-retry-pipeline");
      var response = new BaseUrlResponse();

      try
      {
         response = await pipeline.ExecuteAsync(async token => await this.CreateUrlTask(request));
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

   private async Task<BaseUrlResponse> CreateUrlTask(CreateUrlRequest request)
   {
      string shortUrl = RandomStringHelper.GetRandomString(5);
   
      Url newUrl = new Url
      {
         ShortUrl = shortUrl,
         TargetUrl = request.TargetUrl,
         CreatedDate = DateTime.UtcNow
      };

      this.context.Urls.Add(newUrl);
      await this.context.SaveChangesAsync();
      BaseUrlResponse response = new BaseUrlResponse(newUrl);
   
      return response;
   }

   public async Task<BaseUrlResponse> GetUrl(GetUrlRequest request)
   {
      BaseUrlResponse response = new BaseUrlResponse();

      try
      {
         Url url = await this.context.Urls.FirstOrDefaultAsync(u => u.ShortUrl == request.ShortKey);
         CreateAllUrlAccessRequest createAllAccessRequest = new CreateAllUrlAccessRequest
         {
            Url = url,
            Browser = request.Browser,
            Device = request.Device,
            OperatingSystem = request.OperatingSystem,
            CountryCode = request.CountryCode,
            DateTime = request.DateTime
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
               createAllAccessRequest.Authorised = false;
            } else {
               response = new BaseUrlResponse(url);
               createAllAccessRequest.Authorised = true;
            }

            await this.urlAccessService.CreateAllUrlAccess(createAllAccessRequest);
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

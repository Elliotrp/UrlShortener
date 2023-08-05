namespace UrlShortener.Services;

using System;
using UrlShortener.Models;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using UrlShortener.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

public class UrlAccessService : IUrlAccessService
{
   private readonly IUrlAccessConverter urlAccessConverter;
   private readonly ILogger<IUrlAccessService> logger;
   private readonly UrlShortenerDbContext context;

   public UrlAccessService(
      ILogger<IUrlAccessService> logger,
      IUrlAccessConverter urlAccessConverter,
      UrlShortenerDbContext context)
   {
      this.urlAccessConverter = urlAccessConverter;
      this.logger = logger;
      this.context = context;
   }

   public async Task CreateAllUrlAccess(CreateAllUrlAccessRequest request)
   {
      await this.UpsertUrlAccess<UrlAccessAuthorised, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessAuthorised,
         urlAccess => urlAccess.Authorised == request.Authorised);

      await this.UpsertUrlAccess<UrlAccessBrowser, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessBrowser,
         urlAccess => urlAccess.Browser == request.Browser);

      await this.UpsertUrlAccess<UrlAccessCount, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessCount,
         urlAccess => true);

      await this.UpsertUrlAccess<UrlAccessCountry, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessCountry,
         urlAccess => urlAccess.CountryCode == request.CountryCode);

      await this.UpsertUrlAccess<UrlAccessDate, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessDate,
         urlAccess => urlAccess.Date == DateOnly.FromDateTime(request.DateTime));

      await this.UpsertUrlAccess<UrlAccessDay, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessDay,
         urlAccess => urlAccess.Day == request.DateTime.DayOfWeek);

      await this.UpsertUrlAccess<UrlAccessDevice, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessDevice,
         urlAccess => urlAccess.Device == request.Device);

      await this.UpsertUrlAccess<UrlAccessHour, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessHour,
         urlAccess => urlAccess.Hour == request.DateTime.Hour);

      await this.UpsertUrlAccess<UrlAccessOperatingSystem, CreateAllUrlAccessRequest>(
         request.Url,
         request,
         this.urlAccessConverter.ToUrlAccessOperatingSystem,
         urlAccess => urlAccess.OperatingSystem == request.OperatingSystem);
   }

   public async Task<BaseListUrlAccessResponse<TUrlAccess>> ListUrlAccess<TUrlAccess>(int urlId) where TUrlAccess : BaseUrlAccess
   {
      BaseListUrlAccessResponse<TUrlAccess> response = new BaseListUrlAccessResponse<TUrlAccess>();

      try
      {
         response.UrlAccesses = await this.context.Set<TUrlAccess>().Where(a => a.UrlId == urlId).ToListAsync();
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

   public async Task<GetUrlAccessCountResponse> GetUrlAccessCount(int urlId)
   {
      GetUrlAccessCountResponse response = new GetUrlAccessCountResponse();

      try
      {
         UrlAccessCount urlAccessCount = await this.context.UrlAccessCount.FirstOrDefaultAsync(a => a.UrlId == urlId);
         response.Count = urlAccessCount.Count;
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

   private async Task UpsertUrlAccess<TUrlAccess, TRequest>(
      Url url,
      TRequest request,
      Func<TRequest, TUrlAccess> convertRequest,
      Expression<Func<TUrlAccess, bool>> matchCondition)
      where TUrlAccess : BaseUrlAccess, new()
   {
      try
      {
         TUrlAccess urlAccess = await context.Set<TUrlAccess>().Where(urlAccess => urlAccess.UrlId == url.Id).FirstOrDefaultAsync<TUrlAccess>(matchCondition);

         if (urlAccess != null)
         {
            urlAccess.Count += 1;
         }
         else
         {
            urlAccess = convertRequest(request);
            if (urlAccess == null)
            {
               this.logger.LogError($"No details were provided for {typeof(TUrlAccess)}");
               return;
            }
            urlAccess.Count = 1;
            context.Set<TUrlAccess>().Add(urlAccess);
         }

         await context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
         this.logger.LogError(ex, ex.Message);
      }
   }
}

namespace UrlShortener.Services;

using UrlShortener.Dtos;
using UrlShortener.Models;

public class UrlAccessConverter : IUrlAccessConverter
{
   public UrlAccessAuthorised ToUrlAccessAuthorised(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessAuthorised
      {
         UrlId = request.Url.Id,
         Authorised = request.Authorised
      };
   }

   public UrlAccessBrowser ToUrlAccessBrowser(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessBrowser
      {
         UrlId = request.Url.Id,
         Browser = request.Browser
      };
   }

   public UrlAccessCount ToUrlAccessCount(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessCount
      {
         UrlId = request.Url.Id
      };
   }

   public UrlAccessCountry ToUrlAccessCountry(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessCountry
      {
         UrlId = request.Url.Id,
         CountryCode = request.CountryCode
      };
   }

   public UrlAccessDate ToUrlAccessDate(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessDate
      {
         UrlId = request.Url.Id,
         Date = System.DateOnly.FromDateTime(request.DateTime)
      };
   }

   public UrlAccessDay ToUrlAccessDay(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessDay
      {
         UrlId = request.Url.Id,
         Day = request.DateTime.DayOfWeek
      };
   }

   public UrlAccessDevice ToUrlAccessDevice(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessDevice
      {
         UrlId = request.Url.Id,
         Device = request.Device
      };
   }

   public UrlAccessHour ToUrlAccessHour(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessHour
      {
         UrlId = request.Url.Id,
         Hour = request.DateTime.Hour
      };
   }

   public UrlAccessOperatingSystem ToUrlAccessOperatingSystem(CreateAllUrlAccessRequest request)
   {
      return new UrlAccessOperatingSystem
      {
         UrlId = request.Url.Id,
         OperatingSystem = request.OperatingSystem
      };
   }
}

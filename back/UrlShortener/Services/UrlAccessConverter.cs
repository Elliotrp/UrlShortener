namespace UrlShortener.Services;

using System;
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
      if (request.Browser == null)
      {
         return null;
      }

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
      if (request.CountryCode == null)
      {
         return null;
      }

      return new UrlAccessCountry
      {
         UrlId = request.Url.Id,
         CountryCode = request.CountryCode
      };
   }

   public UrlAccessDate ToUrlAccessDate(CreateAllUrlAccessRequest request)
   {
      if (request.DateTime == DateTime.MinValue)
      {
         return null;
      }

      return new UrlAccessDate
      {
         UrlId = request.Url.Id,
         Date = System.DateOnly.FromDateTime(request.DateTime)
      };
   }

   public UrlAccessDay ToUrlAccessDay(CreateAllUrlAccessRequest request)
   {
      if (request.DateTime == DateTime.MinValue)
      {
         return null;
      }
      
      return new UrlAccessDay
      {
         UrlId = request.Url.Id,
         Day = request.DateTime.DayOfWeek
      };
   }

   public UrlAccessDevice ToUrlAccessDevice(CreateAllUrlAccessRequest request)
   {
      if (request.Device == null)
      {
         return null;
      }

      return new UrlAccessDevice
      {
         UrlId = request.Url.Id,
         Device = request.Device
      };
   }

   public UrlAccessHour ToUrlAccessHour(CreateAllUrlAccessRequest request)
   {
      if (request.DateTime == DateTime.MinValue)
      {
         return null;
      }
      
      return new UrlAccessHour
      {
         UrlId = request.Url.Id,
         Hour = request.DateTime.Hour
      };
   }

   public UrlAccessOperatingSystem ToUrlAccessOperatingSystem(CreateAllUrlAccessRequest request)
   {
      if (request.OperatingSystem == null)
      {
         return null;
      }

      return new UrlAccessOperatingSystem
      {
         UrlId = request.Url.Id,
         OperatingSystem = request.OperatingSystem
      };
   }
}

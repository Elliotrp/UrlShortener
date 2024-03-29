namespace UrlShortener.Dtos;

using System;

public class GetUrlRequest
{
   public string ShortKey { get; set; }

   public string Password { get; set; }

   public string Browser { get; set; }

   public string Device { get; set; }

   public string OperatingSystem { get; set; }

   public string CountryCode { get; set; }

   public DateTime DateTime { get; set; }
}

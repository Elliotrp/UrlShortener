namespace UrlShortener.Dtos;

using System;
using UrlShortener.Models;

public class CreateAllUrlAccessRequest
{
   public Url Url { get; set; }

   public string Browser { get; set; }

   public string Device { get; set; }

   public string OperatingSystem { get; set; }

   public string CountryCode { get; set; }

   public DateTime DateTime { get; set; }

   public bool Authorised { get; set; }
}

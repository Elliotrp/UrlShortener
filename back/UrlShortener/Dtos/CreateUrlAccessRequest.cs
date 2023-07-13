namespace UrlShortener.Dtos;

using NpgsqlTypes;
using UrlShortener.Models;

public class CreateUrlAccessRequest
{
   public Url Url { get; set; }

   public string Browser { get; set; }

   public string DeviceType { get; set; }

   public string OperatingSystem { get; set; }

   public NpgsqlPoint Location { get; set; }

   public bool Authorised { get; set; }

   public string Country { get; set; }
}

namespace UrlShortener.Dtos;

using NpgsqlTypes;

public class GetUrlRequest
{
   public string ShortKey { get; set; }

   public string Password { get; set; }

   public string Browser { get; set; }

   public string DeviceType { get; set; }

   public string OperatingSystem { get; set; }
   
   public NpgsqlPoint Location { get; set; }
}

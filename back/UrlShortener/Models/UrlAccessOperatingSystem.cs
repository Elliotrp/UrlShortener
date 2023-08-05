namespace UrlShortener.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessOperatingSystem")]
public class UrlAccessOperatingSystem : BaseUrlAccess
{
   public string OperatingSystem { get; set; }
}

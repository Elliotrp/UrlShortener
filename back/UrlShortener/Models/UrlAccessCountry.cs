namespace UrlShortener.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessCountry")]
public class UrlAccessCountry : BaseUrlAccess
{
   public string CountryCode { get; set; }
}

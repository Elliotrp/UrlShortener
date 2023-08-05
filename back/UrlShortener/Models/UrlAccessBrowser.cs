namespace UrlShortener.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessBrowser")]
public class UrlAccessBrowser : BaseUrlAccess
{
   public string Browser { get; set; }
}

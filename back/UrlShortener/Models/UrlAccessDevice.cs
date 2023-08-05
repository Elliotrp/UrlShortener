namespace UrlShortener.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessDevice")]
public class UrlAccessDevice : BaseUrlAccess
{
   public string Device { get; set; }
}

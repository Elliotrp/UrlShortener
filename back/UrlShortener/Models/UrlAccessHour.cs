namespace UrlShortener.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessHour")]
public class UrlAccessHour : BaseUrlAccess
{
   public int Hour { get; set; }

}

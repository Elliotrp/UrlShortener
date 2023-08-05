namespace UrlShortener.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessAuthorised")]
public class UrlAccessAuthorised : BaseUrlAccess
{
   public bool Authorised { get; set; }
}

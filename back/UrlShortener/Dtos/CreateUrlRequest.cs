namespace UrlShortener.Dtos;

using System.ComponentModel.DataAnnotations;

public class CreateUrlRequest
{
   [Required]
   public string TargetUrl { get; set; }
}

namespace UrlShortener.Dtos;

using System.ComponentModel.DataAnnotations;

public class AddPasswordRequest
{
   [Required]
   public string Password { get; set; }
}

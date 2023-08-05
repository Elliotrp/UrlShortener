namespace UrlShortener.Models;

using System;
using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessDate")]
public class UrlAccessDate : BaseUrlAccess
{
   public DateOnly Date { get; set; }
}

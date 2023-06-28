namespace UrlShortener.Models;

using System;
using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccess")]
public class UrlAccess
{
   public int Id { get; set; }

   public int UrlId { get; set; }

   public Url Url { get; set; }

   public DateTime AccessedDate { get; set; }
}

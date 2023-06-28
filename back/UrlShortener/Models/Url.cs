namespace UrlShortener.Models;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Url")]
public class Url
{
   public int Id { get; set; }

   public string ShortUrl { get; set; }

   public string TargetUrl { get; set; }

   public DateTime CreatedDate { get; set; }

   public ICollection<UrlAccess> UrlAccesses { get; set; }
}


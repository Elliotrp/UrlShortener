namespace UrlShortener.Models;

using System;

public class Url
{
   public int Id { get; set; }

   public string ShortUrl { get; set; }

   public string TargetUrl { get; set; }

   public DateTime CreatedDate { get; set; }
}


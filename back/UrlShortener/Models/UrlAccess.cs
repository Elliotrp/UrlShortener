namespace UrlShortener.Models;

using System;

public class UrlAccess
{
   public int Id { get; set; }

   public int UrlId { get; set; }

   public DateTime AccessedDate { get; set; }
}

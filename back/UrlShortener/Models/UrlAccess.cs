namespace UrlShortener.Models;

using System;
using System.ComponentModel.DataAnnotations.Schema;
using NpgsqlTypes;

[Table("UrlAccess")]
public class UrlAccess
{
   public int Id { get; set; }

   public int UrlId { get; set; }

   public Url Url { get; set; }

   public DateTime AccessedDate { get; set; }

   public string Browser { get; set; }

   public string DeviceType { get; set; }

   public string OperatingSystem { get; set; }

   public NpgsqlPoint Location { get; set; }

   public bool Authorised { get; set; }

   public string Country { get; set; }
}

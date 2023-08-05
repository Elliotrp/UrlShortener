namespace UrlShortener.Models;

using System;
using System.ComponentModel.DataAnnotations.Schema;

[Table("UrlAccessDay")]
public class UrlAccessDay : BaseUrlAccess
{
   public DayOfWeek Day { get; set; }
}

namespace UrlShortener.Dtos;

using System;
using UrlShortener.Models;

public class BaseUrlResponse : BaseResponse
{
   public BaseUrlResponse() { }
   
   public BaseUrlResponse(Url url)
   {
      this.Id = url.Id;
      this.ShortUrl = url.ShortUrl;
      this.TargetUrl = url.TargetUrl;
      this.CreatedDate = url.CreatedDate;
   }

   public int Id { get; set; }

   public string ShortUrl { get; set; }

   public string TargetUrl { get; set; }

   public DateTime CreatedDate { get; set; }
}

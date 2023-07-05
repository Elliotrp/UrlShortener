namespace UrlShortener.Dtos;

using UrlShortener.Models;

public class BaseUrlResponse : Url
{
   public BaseUrlResponse() { }
   public BaseUrlResponse(Url url)
   {
      this.Id = url.Id;
      this.ShortUrl = url.ShortUrl;
      this.TargetUrl = url.TargetUrl;
      this.CreatedDate = url.CreatedDate;
   }
   public Error Error { get; set; }
}

namespace UrlShortener.Services;

using UrlShortener.Dtos;

public interface IUrlService
{
   public BaseUrlResponse CreateUrl(CreateUrlRequest request);
   
   public BaseUrlResponse GetUrl(string shortKey);
}

namespace UrlShortener.Services;

using UrlShortener.Dtos;

public interface IUrlService
{
   public CreateUrlResponse CreateUrl(CreateUrlRequest request);
   
   public GetUrlResponse GetUrl(string shortKey);
}

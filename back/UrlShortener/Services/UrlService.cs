namespace UrlShortener;

using System;
using UrlShortener.Models;
using UrlShortener.Dtos;

public class UrlService : IUrlService
{
   private readonly UrlShortenerDbContext context;

   public UrlService(UrlShortenerDbContext context)
   {
      this.context = context;
   }

   public CreateUrlResponse CreateUrl(CreateUrlRequest request)
   {
      string shortUrl = RandomStringHelper.GetRandomString(5);

      var newEntity = new Url {
            ShortUrl = shortUrl,
            TargetUrl = request.TargetUrl,
            CreatedDate = DateTime.UtcNow
      };

      this.context.Urls.Add(newEntity);
      this.context.SaveChanges();
      
      return new CreateUrlResponse { ShortUrl = shortUrl };
   }
}

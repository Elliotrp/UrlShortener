namespace UrlShortener.Services;

using System.Threading.Tasks;
using UrlShortener.Dtos;

public interface IUrlService
{
   public Task<BaseUrlResponse> CreateUrl(CreateUrlRequest request);

   public Task<BaseUrlResponse> GetUrl(GetUrlRequest request);

   public Task<BaseUrlResponse> SetPassword(int id, string password);
}

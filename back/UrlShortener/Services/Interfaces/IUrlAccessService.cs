namespace UrlShortener.Services;

using System.Threading.Tasks;
using UrlShortener.Dtos;

public interface IUrlAccessService
{
   public Task CreateUrlAccess(CreateUrlAccessRequest url);

   public Task<UrlAccessesResponse> GetUrlAccessesByUrl(GetUrlAccessesByUrlRequest request);
}

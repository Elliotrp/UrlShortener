namespace UrlShortener.Services;

using System.Threading.Tasks;
using UrlShortener.Dtos;
using UrlShortener.Models;

public interface IUrlAccessService
{
   public Task CreateAllUrlAccess(CreateAllUrlAccessRequest request);

   public Task<BaseListUrlAccessResponse<TUrlAccess>> ListUrlAccess<TUrlAccess>(int urlId) where TUrlAccess : BaseUrlAccess;
}

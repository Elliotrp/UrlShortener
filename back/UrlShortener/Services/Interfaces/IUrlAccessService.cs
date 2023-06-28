namespace UrlShortener.Services;

using System.Threading.Tasks;
using UrlShortener.Models;

public interface IUrlAccessService
{
   public Task CreateUrlAccess(Url url);
}

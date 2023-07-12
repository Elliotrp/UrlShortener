namespace UrlShortener.Services;

using System.Threading.Tasks;
using UrlShortener.Dtos;
using UrlShortener.Models;

public interface IUrlAccessService
{
   public Task CreateUrlAccess(CreateUrlAccessRequest url);
}

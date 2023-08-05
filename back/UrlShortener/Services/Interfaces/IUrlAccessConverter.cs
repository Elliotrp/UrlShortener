namespace UrlShortener.Services;

using UrlShortener.Dtos;
using UrlShortener.Models;

public interface IUrlAccessConverter
{
   public UrlAccessAuthorised ToUrlAccessAuthorised(CreateAllUrlAccessRequest request);

   public UrlAccessBrowser ToUrlAccessBrowser(CreateAllUrlAccessRequest request);

   public UrlAccessCount ToUrlAccessCount(CreateAllUrlAccessRequest request);

   public UrlAccessCountry ToUrlAccessCountry(CreateAllUrlAccessRequest request);

   public UrlAccessDate ToUrlAccessDate(CreateAllUrlAccessRequest request);

   public UrlAccessDay ToUrlAccessDay(CreateAllUrlAccessRequest request);

   public UrlAccessDevice ToUrlAccessDevice(CreateAllUrlAccessRequest request);

   public UrlAccessHour ToUrlAccessHour(CreateAllUrlAccessRequest request);

   public UrlAccessOperatingSystem ToUrlAccessOperatingSystem(CreateAllUrlAccessRequest request);
}

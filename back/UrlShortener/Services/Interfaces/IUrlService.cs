namespace UrlShortener;

using System;
using UrlShortener.Models;
using UrlShortener.Dtos;

public interface IUrlService
{
   public CreateUrlResponse CreateUrl(CreateUrlRequest request);
}

namespace UrlShortener.Dtos;

using System.Collections.Generic;
using UrlShortener.Models;

public class UrlAccessesResponse : IBaseResponse
{
   public ICollection<UrlAccess> UrlAccesses { get; set; }

   public Error Error { get; set; }
}

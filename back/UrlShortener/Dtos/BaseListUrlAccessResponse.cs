namespace UrlShortener.Dtos;

using System.Collections.Generic;
using UrlShortener.Models;

public class BaseListUrlAccessResponse<TUrlAccess> : BaseResponse where TUrlAccess : BaseUrlAccess
{
   public ICollection<TUrlAccess> UrlAccesses { get; set; }
}

namespace UrlShortener.Dtos;

using System;

public class GetUrlResponse : BaseResponse
{
   public string TargetUrl { get; set; }
}

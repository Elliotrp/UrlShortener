namespace UrlShortener.Dtos;

using System;

public class CreateUrlResponse : BaseResponse
{
   public string ShortUrl { get; set; }
}

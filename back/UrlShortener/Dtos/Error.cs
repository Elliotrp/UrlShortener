namespace UrlShortener.Dtos;

public enum ErrorCode
{
   SaveError,
   UrlNotFound,
   InvalidPassword,
   GetError
}

public class Error
{
   public ErrorCode ErrorCode { get; set; }

   public string ErrorMessage { get; set; }
}
namespace UrlShortener.Helpers;

using Microsoft.AspNetCore.Mvc;
using UrlShortener.Dtos;

public static class ResponseStatusHelper
{
   public static IActionResult GetStatusCode(ControllerBase controller, BaseUrlResponse response)
   {
      if (response.Error is null)
      {
         return controller.Ok(response);
      }

      switch (response.Error.ErrorCode)
      {
         case ErrorCode.SaveError:
            return controller.StatusCode(500, response);
         case ErrorCode.UrlNotFound:
         case ErrorCode.GetError:
            return controller.NotFound(response);
         case ErrorCode.InvalidPassword:
            return controller.Unauthorized(response);
         default:
            return controller.Ok(response);
      }
   }
}
namespace UrlShortener.Controllers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UrlShortener.Dtos;
using UrlShortener.Helpers;
using UrlShortener.Services;

[ApiController]
[Route("[controller]")]
public class UrlAccessController : ControllerBase
{
   private readonly ILogger<UrlAccessController> logger;
   private readonly IUrlAccessService urlAccessService;

   public UrlAccessController(
       ILogger<UrlAccessController> logger,
       IUrlAccessService urlAccessService)
   {
      this.logger = logger;
      this.urlAccessService = urlAccessService;
   }

   [HttpGet]
   public async Task<IActionResult> GetUrlAccessesByUrl(string shortKey)
   {
      GetUrlAccessesByUrlRequest request = new GetUrlAccessesByUrlRequest
      {
         ShortKey = shortKey
      };

      UrlAccessesResponse response = await this.urlAccessService.GetUrlAccessesByUrl(request);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
}

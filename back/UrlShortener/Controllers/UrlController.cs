namespace UrlShortener.Controllers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NpgsqlTypes;
using UrlShortener.Dtos;
using UrlShortener.Helpers;
using UrlShortener.Services;

[ApiController]
[Route("[controller]")]
public class UrlController : ControllerBase
{
   private readonly ILogger<UrlController> logger;
   private readonly IUrlService urlService;

   public UrlController(
       ILogger<UrlController> logger,
       IUrlService urlService)
   {
      this.logger = logger;
      this.urlService = urlService;
   }

   [HttpPost]
   public async Task<IActionResult> Create([FromBody] CreateUrlRequest request)
   {
      BaseUrlResponse response = await this.urlService.CreateUrl(request);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }

   [HttpGet("{shortKey}")]
   public async Task<IActionResult> Get(
      string shortKey,
      [FromQuery(Name = "password")] string password,
      [FromQuery(Name = "browser")] string browser,
      [FromQuery(Name = "deviceType")] string deviceType,
      [FromQuery(Name = "operatingSystem")] string operatingSystem,
      [FromQuery(Name = "latitude")] string latitude,
      [FromQuery(Name = "longitude")] string longitude
   )
   {
      GetUrlRequest request = new GetUrlRequest
      {
         ShortKey = shortKey,
         Password = password,
         Browser = browser,
         DeviceType = deviceType,
         OperatingSystem = operatingSystem,
      };

      if (double.TryParse(latitude, out double lat) && double.TryParse(longitude, out double lon)) 
      {
         request.Location = new NpgsqlPoint(lat, lon);
      }

      BaseUrlResponse response = await this.urlService.GetUrl(request);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }

   [HttpPatch("{id}/password")]
   public async Task<IActionResult> AddPassword(int id, [FromBody] AddPasswordRequest request)
   {
      BaseUrlResponse response = await this.urlService.SetPassword(id, request.Password);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
}

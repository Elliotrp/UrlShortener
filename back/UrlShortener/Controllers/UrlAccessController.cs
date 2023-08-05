namespace UrlShortener.Controllers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UrlShortener.Dtos;
using UrlShortener.Helpers;
using UrlShortener.Models;
using UrlShortener.Services;

[ApiController]
[Route("url/{id}/[controller]")]
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
   
   [HttpGet("authorised")]
   public async Task<IActionResult> ListUrlAccessAuthorised(int id)
   {
      BaseListUrlAccessResponse<UrlAccessAuthorised> response = await this.urlAccessService.ListUrlAccess<UrlAccessAuthorised>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }

   
   [HttpGet("browser")]
   public async Task<IActionResult> ListUrlAccessBrowser(int id)
   {
      BaseListUrlAccessResponse<UrlAccessBrowser> response = await this.urlAccessService.ListUrlAccess<UrlAccessBrowser>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }

      
   [HttpGet("count")]
   public async Task<IActionResult> GetUrlAccessCount(int id)
   {
      GetUrlAccessCountResponse response = await this.urlAccessService.GetUrlAccessCount(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
      
   [HttpGet("country")]
   public async Task<IActionResult> ListUrlAccessCountry(int id)
   {
      BaseListUrlAccessResponse<UrlAccessCountry> response = await this.urlAccessService.ListUrlAccess<UrlAccessCountry>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
      
   [HttpGet("date")]
   public async Task<IActionResult> ListUrlAccessDate(int id)
   {
      BaseListUrlAccessResponse<UrlAccessDate> response = await this.urlAccessService.ListUrlAccess<UrlAccessDate>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
      
   [HttpGet("day")]
   public async Task<IActionResult> ListUrlAccessDay(int id)
   {
      BaseListUrlAccessResponse<UrlAccessDay> response = await this.urlAccessService.ListUrlAccess<UrlAccessDay>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
      
   [HttpGet("device")]
   public async Task<IActionResult> ListUrlAccessDevice(int id)
   {
      BaseListUrlAccessResponse<UrlAccessDevice> response = await this.urlAccessService.ListUrlAccess<UrlAccessDevice>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
      
   [HttpGet("hour")]
   public async Task<IActionResult> ListUrlAccessHour(int id)
   {
      BaseListUrlAccessResponse<UrlAccessHour> response = await this.urlAccessService.ListUrlAccess<UrlAccessHour>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
      
   [HttpGet("operatingSystem")]
   public async Task<IActionResult> ListUrlAccessOperatingSystem(int id)
   {
      BaseListUrlAccessResponse<UrlAccessOperatingSystem> response = await this.urlAccessService.ListUrlAccess<UrlAccessOperatingSystem>(id);
      return ResponseStatusHelper.GetStatusCode(this, response);
   }
}

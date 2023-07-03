namespace UrlShortener.Controllers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UrlShortener.Dtos;
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

        if (response.Error is null) {
            return Created("/Url", response);
        }

        return StatusCode(500, response.Error);
    }

    [HttpGet("{shortKey}")]
    public async Task<IActionResult> Get(string shortKey) {
        BaseUrlResponse response = await this.urlService.GetUrl(shortKey);

        if (response.Error is null) {
            return Ok(response);
        }

        return NotFound(response.Error);
    }

    [HttpPatch("{id}/password")]
    public async Task<IActionResult> AddPassword(int id, [FromBody] AddPasswordRequest request)
    {
        BaseUrlResponse response = await this.urlService.SetPassword(id, request.Password);

        if (response.Error is null) {
            return Ok(response);
        }

        return StatusCode(500, response.Error);
    }
}

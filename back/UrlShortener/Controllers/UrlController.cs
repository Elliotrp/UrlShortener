namespace UrlShortener.Controllers;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using UrlShortener.Models;
using UrlShortener.Dtos;

[ApiController]
[Route("[controller]")]
public class UrlController : ControllerBase
{
    private readonly ILogger<UrlController> _logger;
    private readonly IUrlService urlService;

    public UrlController(
        ILogger<UrlController> logger,
        IUrlService urlService)
    {
        _logger = logger;
        this.urlService = urlService;
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateUrlRequest request)
    {
        CreateUrlResponse response = this.urlService.CreateUrl(request);

        if (response.Error is null) {
            return Ok(response);
        }

        return StatusCode(500, response.Error);
    }

    [HttpGet]
    [Route("{shortKey}")]
    public IActionResult Get(string shortKey) {
        GetUrlResponse response = this.urlService.GetUrl(shortKey);

        if (response.Error is null) {
            return Ok(response);
        }

        return NotFound(response.Error);
    }
}

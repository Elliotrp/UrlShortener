using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using UrlShortener.Models;
using UrlShortener.Dtos;

namespace UrlShortener.Controllers
{
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
            return Ok(this.urlService.CreateUrl(request));
        }
    }
}

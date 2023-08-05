namespace UrlShortener.Models;

using Microsoft.EntityFrameworkCore;

public class UrlShortenerDbContext : DbContext
{
   public UrlShortenerDbContext(DbContextOptions<UrlShortenerDbContext> options) : base(options)
   {
   }

   public DbSet<Url> Urls { get; set; }

   public DbSet<UrlAccessAuthorised> UrlAccessAuthorised { get; set; }

   public DbSet<UrlAccessBrowser> UrlAccessBrowser { get; set; }

   public DbSet<UrlAccessCount> UrlAccessCount { get; set; }

   public DbSet<UrlAccessCountry> UrlAccessCountry { get; set; }

   public DbSet<UrlAccessDate> UrlAccessDate { get; set; }

   public DbSet<UrlAccessDay> UrlAccessDay { get; set; }

   public DbSet<UrlAccessDevice> UrlAccessDevice { get; set; }

   public DbSet<UrlAccessHour> UrlAccessHour { get; set; }

   public DbSet<UrlAccessOperatingSystem> UrlAccessOperatingSystem { get; set; }
}

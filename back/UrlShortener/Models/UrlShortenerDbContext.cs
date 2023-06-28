namespace UrlShortener.Models;

using Microsoft.EntityFrameworkCore;

public class UrlShortenerDbContext : DbContext
{
   public UrlShortenerDbContext(DbContextOptions<UrlShortenerDbContext> options) : base(options)
   {
   }      
   
   public DbSet<Url> Urls { get; set; }

   public DbSet<UrlAccess> UrlAccesses { get; set; }
}

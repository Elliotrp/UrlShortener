namespace UrlShortener.Models;

using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

public class UrlShortenerDbContext : DbContext
{
   public UrlShortenerDbContext(DbContextOptions<UrlShortenerDbContext> options) : base(options)
   {
   }      
   
   public DbSet<Url> Urls { get; set; }

   public DbSet<Url> UrlAccesses { get; set; }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DigitalArt.Models
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Artwork> Artworks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }

        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Artworks)
                .WithOne(a => a.Author);

            modelBuilder.Entity<Artwork>()
                .HasMany(a => a.Comments)
                .WithOne(c => c.Artwork);

            modelBuilder.Entity<Artwork>()
                .HasMany(a => a.Likes)
                .WithOne(l => l.Artwork);
        }
    }
}

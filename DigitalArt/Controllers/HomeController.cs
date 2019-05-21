using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalArt.Models;
using Microsoft.AspNetCore.Authorization;

namespace DigitalArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly Context _context;

        public HomeController(Context context)
        {
            _context = context;
        }

        // GET: api/Home
        [HttpGet]
        public async Task<IActionResult> GetArtworks([FromQuery] string sortParams)
        {
            var arts = await _context.Artworks
                .Include(w => w.Author)
                .Include(w => w.Likes)
                .Include(w => w.Comments)
                .Include(w => w.Tags)
                .Select(a => new
                {
                    id = a.Id,
                    name = a.Name,
                    author = a.Author.Name + " " + a.Author.LastName,
                    description = a.Description,
                    date = a.DateOfPublication,
                    countLikes = a.Likes.Count,
                    countComments = a.Comments.Count,
                    countViews = a.CountViews,
                    tags = a.Tags,
                    art = a.Art
                }).ToListAsync();

            var sortedArts = arts;
            switch (sortParams)
            {
                case "Самые популярные":
                    sortedArts = arts.OrderByDescending(art => art.countLikes).ToList();
                    break;
                case "Самые новые":
                    sortedArts =  arts.OrderByDescending(art => art.date).ToList();
                    break;
                case "Самые обсуждаемые":
                    sortedArts = arts.OrderByDescending(art => art.countComments).ToList();
                    break;
                case "Самые просматриваемые":
                    sortedArts = arts.OrderByDescending(art => art.countViews).ToList();
                    break;
            }

            return Ok(sortedArts);
        }

        // GET: api/Home/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtwork([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var art = _context.Artworks
                .Include(w => w.Author)
                .Include(w => w.Likes)
                .Include(w => w.Comments)
                .Include(w => w.Tags)
                .Where(a => a.Id == id)
                .Select(a => new
                {
                    id = a.Id,
                    name = a.Name,
                    author = a.Author.Name + " " + a.Author.LastName,
                    authorAvatar = a.Author.Avatar,
                    authorId = a.Author.Id,
                    description = a.Description,
                    date = a.DateOfPublication,
                    countComments = a.Comments.Count,
                    countLikes = a.Likes.Count,
                    countViews = a.CountViews,
                    comments = a.Comments
                        .Select(c => new
                        {
                            commentAuthor = c.Author.Name + " " + c.Author.LastName,
                            commentAuthorAvatar = c.Author.Avatar,
                            commentAuthorId = c.Author.Id,
                            comment = c.CommentString,
                            date = c.DateOfPublication
                        }),
                    tags = a.Tags,
                    art = a.Art
                }).FirstOrDefault();

            if (art == null)
            {
                return NotFound();
            }

            return Ok(art);
        }

        // PUT: api/Home/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtwork([FromRoute] int id, [FromBody] Artwork artwork)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != artwork.Id)
            {
                return BadRequest();
            }

            _context.Entry(artwork).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtworkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Home
        [HttpPost]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> PostArtwork([FromForm]ArtworkData artworkData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var author = await _context.Users.FindAsync(artworkData.IdAuthor);

            var artwork = new Artwork
            {
                Name = artworkData.Name,
                Author = author,
                DateOfPublication = DateTime.Now,
                Description = artworkData.Description,
                Tags = artworkData.Tags
            };

            if (artworkData.File != null)
            {
                using (var binaryReader = new BinaryReader(artworkData.File.OpenReadStream()))
                {
                    var imageData = binaryReader.ReadBytes((int)artworkData.File.Length);
                    artwork.Art = imageData;
                }
            }            

            _context.Artworks.Add(artwork);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Home/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteArtwork([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artwork = await _context.Artworks.FindAsync(id);
            if (artwork == null)
            {
                return NotFound();
            }

            _context.Artworks.Remove(artwork);
            await _context.SaveChangesAsync();

            return Ok(artwork);
        }

        private bool ArtworkExists(int id)
        {
            return _context.Artworks.Any(e => e.Id == id);
        }
    }

    public class ArtworkData
    {
        public string Name { get; set; }

        public int IdAuthor { get; set; }

        public IFormFile File { get; set; }

        public string Description { get; set; }
         
        public string Tags { get; set; }
    }
}
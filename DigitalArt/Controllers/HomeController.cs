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
        public async Task<IActionResult> GetArtworks()
        {
            var arts = _context.Artworks
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
                    countComents = a.Comments.Count,
                    tags = a.Tags.Select(t => t.TagName).ToList(),
                    art = a.Art
                });

            return Ok(arts);
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
                    countLikes = a.Likes.Count,
                    countComments = a.Comments.Count,
                    comments = a.Comments.Select(c => new
                                    {
                                        commentAuthor = c.Author.Name + " " + c.Author.LastName,
                                        commentAuthorId = c.Author.Id,
                                        comment = c.CommentString 
                                    }),
                    tags = a.Tags.Select(t => t.TagName).ToList(),
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
            
            var author = _context.Users.FirstOrDefaultAsync(u => u.Email == artworkData.Author);

            var artwork = new Artwork
            {
                Name = artworkData.Name,
                Author = author.Result,
                DateOfPublication = DateTime.Now,
                Description = artworkData.Description
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

        public string Author { get; set; }

        public IFormFile File { get; set; }

        public string Description { get; set; }

        //public DateTime Date { get; set; }
         
        public string Tags { get; set; }
    }
}
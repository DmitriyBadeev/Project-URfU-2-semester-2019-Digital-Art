using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalArt.Models;

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
        public IEnumerable<Artwork> GetArtworks()
        {
            return _context.Artworks;
        }

        // GET: api/Home/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtwork([FromRoute] int id)
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

            return Ok(artwork);
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
        public async Task<IActionResult> PostArtwork([FromBody] Artwork artwork)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Artworks.Add(artwork);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtwork", new { id = artwork.Id }, artwork);
        }

        // DELETE: api/Home/5
        [HttpDelete("{id}")]
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
}
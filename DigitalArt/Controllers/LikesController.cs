using System;
using System.Collections.Generic;
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
    public class LikesController : ControllerBase
    {
        private readonly Context _context;

        public LikesController(Context context)
        {
            _context = context;
        }

        // GET: api/likes/3
        [HttpGet("{idArt}")]
        public int GetLikes([FromRoute] int idArt)
        {
            return _context.Likes.Where(c => c.Artwork.Id == idArt).Count();
        }

        // POST: api/likes
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostLike([FromBody] Like like)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok(like);
        }

        // DELETE: api/Likes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLike([FromRoute] Like userLike)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var like = await _context.Likes.FindAsync(userLike);
            if (like == null)
            {
                return NotFound();
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            return Ok(like);
        }
    }
}
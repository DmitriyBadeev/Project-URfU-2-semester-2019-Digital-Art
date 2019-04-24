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

        // GET: api/likes
        [HttpGet]
        public async Task<IActionResult> GetLikes([FromQuery] int userId, [FromQuery] int artworkId)
        {
            var count = await _context.Likes.CountAsync(c => c.Artwork.Id == artworkId);
            var isLiked = await _context.Likes.AnyAsync(l => l.LikedUser.Id == userId && l.Artwork.Id == artworkId);

            var response = new
            {
                countLikes = count,
                isLiked = isLiked
            };

            return Ok(response);
        }

        // POST: api/likes
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostLike([FromBody] LikeData likeData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(likeData.UserId);
            var artwork = await _context.Artworks.FindAsync(likeData.ArtworkId);

            var like = new Like
            {
                Artwork = artwork,
                LikedUser = user
            };

            var sameLike = await _context.Likes.FirstOrDefaultAsync(l =>
                l.Artwork.Id == likeData.ArtworkId && l.LikedUser.Id == likeData.UserId);

            if (sameLike != null)
            {
                var sameCount = _context.Likes.Count(c => c.Artwork.Id == artwork.Id);

                return Ok(sameCount);
            }

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            var currentCount = _context.Likes.Count(c => c.Artwork.Id == artwork.Id);

            return Ok(currentCount);
        }

        // DELETE: api/Likes
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteLike([FromQuery] int userId, [FromQuery] int artworkId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var like = await _context.Likes.FirstOrDefaultAsync(l => l.Artwork.Id == artworkId && l.LikedUser.Id == userId);
            if (like == null)
            {
                return NotFound();
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            var currentCount = await _context.Likes.CountAsync(c => c.Artwork.Id == artworkId);

            return Ok(currentCount);
        }
    }

    public class LikeData
    {
        public int UserId { get; set; }

        public int ArtworkId { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
    public class CommentsController : ControllerBase
    {
        private readonly Context _context;

        public CommentsController(Context context)
        {
            _context = context;
        }

        // GET: api/comments/3
        [HttpGet("{idArt}")]
        public IEnumerable<Comment> GetComments([FromRoute] int idArt)
        {
            return _context.Comments.Where(c => c.Artwork.Id == idArt);
        }

        // POST: api/Comments
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostComment([FromBody] CommentData commentData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var author = await _context.Users.FirstOrDefaultAsync(u => u.Id == commentData.IdAuthor);
            var art = await _context.Artworks.FirstOrDefaultAsync(a => a.Id == commentData.IdArt);
            var dateOfPublication = DateTime.Now;

            var comment = new Comment
            {
                Author = author,
                Artwork = art,
                CommentString = commentData.Comment,
                DateOfPublication = dateOfPublication
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            var response = new
            {
                commentAuthor = author.Name + " " + author.LastName,
                commentAuthorAvatar = author.Avatar,
                commentAuthorId = author.Id,
                comment = commentData.Comment,
                date = dateOfPublication
            };

            return Ok(response);
        }
    }

    public class CommentData
    {
        public int IdAuthor { get; set; }

        public int IdArt { get; set; }

        public string Comment { get; set; }
    }
}
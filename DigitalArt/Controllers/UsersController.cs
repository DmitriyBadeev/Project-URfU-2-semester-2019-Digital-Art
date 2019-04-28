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
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Context _context;

        public UsersController(Context context)
        {
            _context = context;
        }

        // GET: api/Users
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var arts = _context.Artworks
                .Include(w => w.Likes)
                .Include(w => w.Comments)
                .Include(w => w.Tags)
                .Where(a => a.Author.Id == user.Id)
                .Select(a => new
                {
                    id = a.Id,
                    name = a.Name,
                    description = a.Description,
                    author = a.Author.Name + " " + a.Author.LastName,
                    date = a.DateOfPublication,
                    countLikes = a.Likes.Count,
                    countComments = a.Comments.Count,
                    countViews = a.CountViews,
                    art = a.Art,
                    tags = a.Tags.Select(t => t.TagName).ToList()
                });

            var response = new
            {
                id = user.Id,
                email = user.Email,
                name = user.Name,
                lastName = user.LastName,
                avatar = user.Avatar,
                artworks = arts
            };

            Response.ContentType = "application/json";
            return Ok(response);
        }
    }
}
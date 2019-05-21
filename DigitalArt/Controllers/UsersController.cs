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
    public class UsersController : ControllerBase
    {
        private readonly Context _context;

        public UsersController(Context context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id, [FromQuery] string sortParams)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var arts = await _context.Artworks
                .Include(w => w.Likes)
                .Include(w => w.Comments)
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
                    tags = a.Tags
                }).ToListAsync();

            var sortedArts = arts;
            switch (sortParams)
            {
                case "Самые популярные":
                    sortedArts = arts.OrderByDescending(art => art.countLikes).ToList();
                    break;
                case "Самые новые":
                    sortedArts = arts.OrderByDescending(art => art.date).ToList();
                    break;
                case "Самые обсуждаемые":
                    sortedArts = arts.OrderByDescending(art => art.countComments).ToList();
                    break;
                case "Самые просматриваемые":
                    sortedArts = arts.OrderByDescending(art => art.countViews).ToList();
                    break;
            }

            var response = new
            {
                id = user.Id,
                email = user.Email,
                name = user.Name,
                dateOfBirthday = user.DateOfBirthDay,
                status = user.Status,
                about = user.About,
                country = user.Country,
                city = user.City,
                lastName = user.LastName,
                avatar = user.Avatar,
                artworks = sortedArts
            };

            return Ok(response);
        }

        // PUT: api/users
        [HttpPut]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> PutUserInfo([FromForm] UserInfo newInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = await _context.Users.FirstOrDefaultAsync(u => newInfo.Id == u.Id);

            if (newInfo.Avatar != null)
            {
                using (var binaryReader = new BinaryReader(newInfo.Avatar.OpenReadStream()))
                {
                    var imageData = binaryReader.ReadBytes((int)newInfo.Avatar.Length);
                    currentUser.Avatar = imageData;
                }
            }

            currentUser.About = newInfo.About;
            currentUser.City = newInfo.City;
            currentUser.Country = newInfo.Country;
            currentUser.DateOfBirthDay = newInfo.DateOfBirthDay;
            currentUser.Email = newInfo.Email;
            currentUser.LastName = newInfo.LastName;
            currentUser.Name = newInfo.Name;
            currentUser.Status = newInfo.Status;

            await _context.SaveChangesAsync();            

            return Ok(currentUser);
        }
    }

    public class UserInfo
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirthDay { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Status { get; set; }

        public string About { get; set; }

        public IFormFile Avatar { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.IO;
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
    public class RegistrationController : ControllerBase
    {
        private readonly Context _context;

        public RegistrationController(Context context)
        {
            _context = context;
        }

        // POST: api/Registration
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var equalUser = _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (equalUser.Result != null)
                return Conflict("Пользователь уже существует");

            user.Password = AuthOptions.ComputeHash(user.Password);
            var jwt = AuthOptions.GetJWT(user);

            var rootPath = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory);
            rootPath = Directory.GetParent(rootPath).FullName;
            rootPath = Directory.GetParent(rootPath).FullName;
            rootPath = Directory.GetParent(rootPath).FullName;

            using (var fstream = new FileStream(rootPath + @"\etc\anon.png", FileMode.OpenOrCreate))
            {
                var byteArray = new byte[fstream.Length];
                fstream.Read(byteArray, 0, byteArray.Length);
                user.Avatar = byteArray;
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var response = new
            {
                user.Id,
                email = user.Email,
                name = user.Name,
                lastName = user.LastName,
                token = jwt
            };

            return Ok(response);
        }
    }
}
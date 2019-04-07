﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalArt.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace DigitalArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Context _context;

        public AuthController(Context context)
        {
            _context = context;
        } 

        // POST: api/auth
        [HttpPost]
        public async Task<IActionResult> Authorization([FromBody] AuthData data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var user = GetUser(data.Login, data.Password);
            if (user == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password");
                return Forbid();
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };
            

            var nowTime = DateTime.Now;

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: nowTime,
                claims: claims,
                expires: nowTime.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME_IN_MINUTE)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSecurityKey(), SecurityAlgorithms.HmacSha256));
            
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                accses_token = encodedJwt,
                //id = user.Id,
                //email = user.Email,
                //name = user.Name,
                //lastName = user.LastName,
                //artworks = user.Artworks
            };

            Response.ContentType = "application/json";
            //await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
            return Ok(response);
        }

        private User GetUser(string login, string password)
        {
            var potentialUser = _context.Users
                    .FirstOrDefault(user => user.Email == login);
            if (potentialUser == null)
                return null;

            if (potentialUser.Password == AuthOptions.ComputeHash(password))
                return potentialUser;

            return null;
        }
    }

    public class AuthData
    {
        public string Login { get; set; }

        public string Password { get; set; }
    }

}
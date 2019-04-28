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
    public class ViewsController : ControllerBase
    {
        private readonly Context _context;

        public ViewsController(Context context)
        {
            _context = context;
        }

        // GET: api/Views/4
        [HttpGet("{id}")]
        public async Task<IActionResult> GetViews([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var art = await _context.Artworks.FindAsync(id);

            if (art == null)
                return NotFound();

            return Ok(art.CountViews);
        }

        // POST: api/Views/4
        [HttpPost("{id}")]
        public async Task<IActionResult> PostView([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var art = await _context.Artworks.FindAsync(id);

            art.CountViews++;

            await _context.SaveChangesAsync();

            return Ok(art.CountViews);
        }
    }
}
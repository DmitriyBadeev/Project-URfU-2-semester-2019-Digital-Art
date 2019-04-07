using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using DigitalArt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private Context db;

        public MainController(Context context)
        {
            db = context;
        }

        // GET api/home
        [HttpGet]
        public ActionResult<IEnumerable<Artwork>> Get()
        {
            return db.Artworks.ToArray();
        }

        // GET api/home/5
        [HttpGet("{id}")]
        public ActionResult<Artwork> Get(int id)
        {
            return db.Artworks.Find(id);
        }

        // POST api/home
        [HttpPost]
        public void Post([FromBody]Artwork work)
        {
            db.Artworks.Add(work);
            db.SaveChanges();
        }

        // PUT api/home/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Artwork newWork)
        {
            var work = db.Artworks.Find(id);
            work = newWork;
            db.Update(work);
            db.SaveChanges();
        }

        // DELETE api/home/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            db.Remove(db.Artworks.Find(id));
            db.SaveChanges();
        }
    }
}

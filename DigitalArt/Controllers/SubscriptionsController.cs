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
    public class SubscriptionsController : ControllerBase
    {
        private readonly Context _context;

        public SubscriptionsController(Context context)
        {
            _context = context;
        }

        // GET: api/Subscriptions
        [HttpGet]
        public async Task<IActionResult> GetSubscriptions([FromQuery] int idAuthor, int idAuthUser = 0)
        {
            var countSubs = await _context.Subscriptions.Where(s => s.User.Id == idAuthor).CountAsync();
            var isSubscribe = _context.Subscriptions
                .Any(s => s.User.Id == idAuthor && s.SubscriberId == idAuthUser);

            var response = new
            {
                countSubscribers = countSubs,
                isSubscribeAuthUser = isSubscribe
            };

            return Ok(response);
        }

        // POST: api/Subscriptions
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostSubscription([FromQuery] int idAuthor, int idUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subscription = new Subscription();
            var author = await _context.Users.FindAsync(idAuthor);
            subscription.SubscriberId = idUser;
            subscription.User = author;
            

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            var countSubs = await _context.Subscriptions.Where(s => s.User.Id == idAuthor).CountAsync();
            var isSubscribe = _context.Subscriptions
                .Any(s => s.User.Id == idAuthor && s.SubscriberId == idUser);


            var response = new
            {
                countSubscribers = countSubs,
                isSubscribeAuthUser = isSubscribe
            };

            return Ok(response);
        }

        // DELETE: api/Subscriptions
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteSubscription([FromQuery] int idAuthor, int idUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subscription = await _context.Subscriptions.Where(s => s.User.Id == idAuthor && s.SubscriberId == idUser).FirstOrDefaultAsync();
            if (subscription == null)
            {
                return NotFound();
            }

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();

            var countSubs = await _context.Subscriptions.Where(s => s.User.Id == idAuthor).CountAsync();
            var isSubscribe = _context.Subscriptions
                .Any(s => s.User.Id == idAuthor && s.SubscriberId == idUser);

            var response = new
            {
                countSubscribers = countSubs,
                isSubscribeAuthUser = isSubscribe
            };

            return Ok(response);
        }
    }
}

// send on client all ids user subscribed and check theirs TODO
using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Users.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public SubscriptionController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }
        
        [HttpGet("{id:int}", Name = "GetSubscriptions")]
        public ActionResult<Subscription> Get(int id)
        {
            var categoria = _claimitContext.Subscriptions?.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return categoria is null ? NotFound() : categoria;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Subscription>> Get()
        {
            var exs = _claimitContext.Subscriptions?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpPost]
        public ActionResult<Subscription> Post(Subscription ex)
        {
            if (ex is null) return BadRequest();

            _claimitContext.SaveChanges();

            return new CreatedAtRouteResult("GetSubscription", new { id = ex.Id, ex });
        }

        [HttpPut("{id:int}")]
        public ActionResult<Subscription> Put(int id, Subscription ex)
        {
            if (ex is null || ex.Id != id) return BadRequest();

            _claimitContext.Entry(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var categoria = _claimitContext.Subscriptions?.FirstOrDefault(c => c.Id == id);

            if (categoria is null) return NotFound();

            _claimitContext.Subscriptions?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}
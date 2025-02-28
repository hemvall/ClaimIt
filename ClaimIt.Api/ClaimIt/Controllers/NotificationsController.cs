using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Item.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public NotificationsController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }
        
        [HttpGet("{id:int}", Name = "GetNotifications")]
        public ActionResult<Notifications> Get(int id)
        {
            var categoria = _claimitContext.Notifications?.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return categoria is null ? NotFound() : categoria;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Notifications>> Get()
        {
            var exs = _claimitContext.Notifications?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpPost]
        public ActionResult<Notifications> Post(Notifications ex)
        {
            if(ex is null) return BadRequest();

            _claimitContext.Notifications?.Add(ex);
            _claimitContext.SaveChanges();

            return new CreatedAtRouteResult("GetNotifications", new { id = ex.Id, ex});
        }

        [HttpPut("{id:int}")]
        public ActionResult<Notifications> Put(int id, Notifications ex)
        {
            if(ex is null || ex.Id != id) return BadRequest();

            _claimitContext.Entry(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var categoria = _claimitContext.Notifications?.FirstOrDefault(c => c.Id == id);

            if(categoria is null) return NotFound();

            _claimitContext.Notifications?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}
using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Item.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AirdropsController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public AirdropsController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }
        
        [HttpGet("{id:int}", Name = "GetAirdrops")]
        public ActionResult<Airdrops> Get(int id)
        {
            var categoria = _claimitContext.Airdrops?.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return categoria is null ? NotFound() : categoria;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Airdrops>> Get()
        {
            var exs = _claimitContext.Airdrops?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpPost]
        public ActionResult<Airdrops> Post(Airdrops ex)
        {
            if(ex is null) return BadRequest();

            _claimitContext.Airdrops?.Add(ex);
            _claimitContext.SaveChanges();

            return new CreatedAtRouteResult("GetAirdrops", new { id = ex.Id, ex});
        }

        [HttpPut("{id:int}")]
        public ActionResult<Airdrops> Put(int id, Airdrops ex)
        {
            if(ex is null || ex.Id != id) return BadRequest();

            _claimitContext.Entry(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var categoria = _claimitContext.Airdrops?.FirstOrDefault(c => c.Id == id);

            if(categoria is null) return NotFound();

            _claimitContext.Airdrops?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}
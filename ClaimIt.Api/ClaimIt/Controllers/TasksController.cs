using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Item.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WalletsController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public WalletsController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }
        
        [HttpGet("{id:int}", Name = "GetWallets")]
        public ActionResult<Wallets> Get(int id)
        {
            var categoria = _claimitContext.Wallets?.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return categoria is null ? NotFound() : categoria;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Wallets>> Get()
        {
            var exs = _claimitContext.Wallets?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpPost]
        public ActionResult<Wallets> Post(Wallets ex)
        {
            if(ex is null) return BadRequest();

            _claimitContext.Wallets?.Add(ex);
            _claimitContext.SaveChanges();

            return new CreatedAtRouteResult("GetWallets", new { id = ex.Id, ex});
        }

        [HttpPut("{id:int}")]
        public ActionResult<Wallets> Put(int id, Wallets ex)
        {
            if(ex is null || ex.Id != id) return BadRequest();

            _claimitContext.Entry(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var categoria = _claimitContext.Wallets?.FirstOrDefault(c => c.Id == id);

            if(categoria is null) return NotFound();

            _claimitContext.Wallets?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}
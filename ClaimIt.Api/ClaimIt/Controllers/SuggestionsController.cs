using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Item.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SuggestionsController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public SuggestionsController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }
        
        [HttpGet("{id:int}", Name = "GetSuggestions")]
        public ActionResult<Suggestions> Get(int id)
        {
            var categoria = _claimitContext.Suggestions?.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return categoria is null ? NotFound() : categoria;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Suggestions>> Get()
        {
            var exs = _claimitContext.Suggestions?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpPost]
        public ActionResult<Suggestions> Post(Suggestions ex)
        {
            if(ex is null) return BadRequest();

            _claimitContext.Suggestions?.Add(ex);
            _claimitContext.SaveChanges();

            return new CreatedAtRouteResult("GetSuggestions", new { id = ex.Id, ex});
        }

        [HttpPut("{id:int}")]
        public ActionResult<Suggestions> Put(int id, Suggestions ex)
        {
            if(ex is null || ex.Id != id) return BadRequest();

            _claimitContext.Entry(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var categoria = _claimitContext.Suggestions?.FirstOrDefault(c => c.Id == id);

            if(categoria is null) return NotFound();

            _claimitContext.Suggestions?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}
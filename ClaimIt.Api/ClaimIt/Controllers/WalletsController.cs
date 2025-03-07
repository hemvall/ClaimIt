using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Item.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public TasksController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }
        
        [HttpGet("{id:int}", Name = "GetTasks")]
        public ActionResult<Tasks> Get(int id)
        {
            var categoria = _claimitContext.Tasks?.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return categoria is null ? NotFound() : categoria;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Tasks>> Get()
        {
            var exs = _claimitContext.Tasks?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpPost]
        public ActionResult<Tasks> Post(Tasks ex)
        {
            if(ex is null) return BadRequest();

            _claimitContext.Tasks?.Add(ex);
            _claimitContext.SaveChanges();

            return new CreatedAtRouteResult("GetTasks", new { id = ex.Id, ex});
        }

        [HttpPut("{id:int}")]
        public ActionResult<Tasks> Put(int id, Tasks ex)
        {
            if(ex is null || ex.Id != id) return BadRequest();

            _claimitContext.Entry(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var categoria = _claimitContext.Tasks?.FirstOrDefault(c => c.Id == id);

            if(categoria is null) return NotFound();

            _claimitContext.Tasks?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}
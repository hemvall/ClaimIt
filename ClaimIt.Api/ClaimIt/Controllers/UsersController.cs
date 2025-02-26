using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
/*using BCrypt.Net;
*/
namespace Users.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public UsersController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }
        
        [HttpGet("{id:int}", Name = "GetUsers")]
        public ActionResult<User> Get(int id)
        {
            var categoria = _claimitContext.Users?.AsNoTracking().FirstOrDefault(x => x.Id == id);
            return categoria is null ? NotFound() : categoria;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            var exs = _claimitContext.Users?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpPost("Authentification")]
        public ActionResult<User> Authentification(User ex)
        {
            if (ex is null) return BadRequest();

            User usr = _claimitContext.Users.FirstOrDefault(x => x.Mail == ex.Mail && x.Password == ex.Password);

            if (usr is null) return NotFound();

            return usr;
        }

        [HttpPost]
        public ActionResult<User> Post(User ex)
        {
            if(ex is null) return BadRequest();
            
            _claimitContext.SaveChanges();

            return new CreatedAtRouteResult("GetUser", new { id = ex.Id, ex});
        }

        [HttpPut("{id:int}")]
        public ActionResult<User> Put(int id, User ex)
        {
            if(ex is null || ex.Id != id) return BadRequest();

            _claimitContext.Entry<User>(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var categoria = _claimitContext.Users?.FirstOrDefault(c => c.Id == id);

            if(categoria is null) return NotFound();

            _claimitContext.Users?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}
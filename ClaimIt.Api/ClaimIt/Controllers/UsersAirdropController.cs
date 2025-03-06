using claimit_api.Context;
using ClaimIt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
/*using BCrypt.Net;
*/
namespace UserAirdropAirdrop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserAirdropController : ControllerBase
    {
        private readonly ClaimItContext _claimitContext;

        public UserAirdropController(ClaimItContext claimitContext)
        {
            _claimitContext = claimitContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserAirdrop>> Get()
        {
            var exs = _claimitContext.UserAirdrop?.AsNoTracking().ToList();
            return exs is null ? NotFound() : exs;
        }

        [HttpGet("User/{uId:int}/Airdrops", Name = "GetUserAirdrops")]
        public ActionResult<UserAirdrop> Get([FromRoute] int uId)
        {
            var categoria = _claimitContext.UserAirdrop?
                .AsNoTracking()
                .Where(x => x.UserId == uId);

            return categoria is null ? NotFound() : Ok(categoria);
        }

        [HttpGet("User/{uId:int}/Airdrop/{aId:int}", Name = "GetSpecificUserAirdrop")]
        public ActionResult<UserAirdrop> Get([FromRoute] int aId, [FromRoute] int uId)
        {
            if (_claimitContext.UserAirdrop is null)
                return Problem("Database context is null");

            var userAirdrop = _claimitContext.UserAirdrop
                .AsNoTracking()
                .FirstOrDefault(x => x.AirdropId == aId && x.UserId == uId);

            return userAirdrop is null ? NotFound() : Ok(userAirdrop);
        }


        [HttpPost]
        public ActionResult<UserAirdrop> Post([FromBody] UserAirdrop userAirdrop)
        {
            if (userAirdrop is null)
                return BadRequest();

            _claimitContext.UserAirdrop.Add(userAirdrop);
            _claimitContext.SaveChanges();

            return userAirdrop;
        }


        [HttpPut("{id:int}")]
        public ActionResult<UserAirdrop> Put(int uId, UserAirdrop ex)
        {
            if(ex is null || ex.UserId != uId) return BadRequest();

            _claimitContext.Entry<UserAirdrop>(ex).State = EntityState.Modified;
            _claimitContext.SaveChanges();

            return Ok(ex);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int aId, int uId)
        {
            var categoria = _claimitContext.UserAirdrop?.FirstOrDefault(c => c.AirdropId == aId && c.UserId == uId);

            if(categoria is null) return NotFound();

            _claimitContext.UserAirdrop?.Remove(categoria);
            _claimitContext.SaveChanges();

            return Ok(categoria);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Item.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SignalsController : ControllerBase
    {        
        [HttpGet(Name = "GetSignals")]
        public async Task<IActionResult> GetSignalsJson()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Signals", "signals.json");

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(new { message = "File not found." });
            }

            var jsonContent = await System.IO.File.ReadAllTextAsync(filePath);

            // Return raw JSON
            return Content(jsonContent, "application/json");
        }
    }
}
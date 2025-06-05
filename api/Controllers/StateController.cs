
using Microsoft.AspNetCore.Mvc;

namespace TODOulette
{
    [ApiController]
    [Route("api/state")]
    public class StateController : ControllerBase
    {
        [HttpGet("ping")]
        public IActionResult Ping()
            => Ok("Pong");
    }
}
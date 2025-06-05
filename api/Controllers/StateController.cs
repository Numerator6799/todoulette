
using Microsoft.AspNetCore.Mvc;

namespace TODOulette
{
    [ApiController]
    [Route("api/state")]
    public class StateController : ControllerBase
    {
        [HttpPost("ping")]
        public IActionResult Ping()
            => Ok("Pong");
    }
}
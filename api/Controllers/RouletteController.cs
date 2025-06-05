
using Microsoft.AspNetCore.Mvc;

namespace TODOulette
{
    [ApiController]
    [Route("api/roulette")]
    public class RouletteController : ControllerBase
    {
        private readonly RouletteService _rouletteService;

        public RouletteController(RouletteService rouletteService)
        {
            _rouletteService = rouletteService;
        }

        [HttpPost("spin")]
        public IActionResult SpinRoulette(string userId)
        {
            var result = _rouletteService.Spin(userId);
            return Ok(new { task = result });
        }
    }
}
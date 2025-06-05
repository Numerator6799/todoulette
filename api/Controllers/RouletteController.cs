
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

        [HttpGet]
        public IActionResult GetAll(string userId)
        {
            return Ok("all the roulettes");
        }

        [HttpGet]
        public IActionResult GetById(string rouletteId)
        {
            return Ok("roulette by id");
        }

         [HttpPost]
        public IActionResult Create(Roulette roulette)
        {
            _rouletteService.Create(roulette);
            return Ok();
        }

        [HttpPost("spin")]
        public IActionResult SpinRoulette(string userId)
        {
            var result = _rouletteService.Spin(userId);
            return Ok(new { task = result });
        }
    }
}
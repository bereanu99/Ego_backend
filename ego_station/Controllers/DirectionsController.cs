using ego_station.Models;
using ego_station.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ego_station.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectionsController : ControllerBase
    {
        private readonly DirectionService _directionService;
        public DirectionsController(DirectionService directionService)
        {
            _directionService = directionService;
        }

        [HttpPost(Name = "Direction")]
        public IActionResult Direction([FromBody] DirectionModel directionModel)
        {
            var res = _directionService.GetDirections(directionModel);

            return Ok(res);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ego_station.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EStationController : ControllerBase
    {
        [HttpGet("id", Name = "GetStation")]
        public async Task<IActionResult> GetStationAsync(string id)
        {

        }

        [HttpGet(Name = "GetStations")]
        public async Task<IActionResult> GetStationsAsync()
        {

        }

        [HttpPost(Name = "CreateStations")]
        public async Task<IActionResult> CreateStationAsync([FromBody] StationModel station)
        {

        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ego_station.Infrastructure;
using ego_station.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ego_station.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StationController : ControllerBase
    {
        private readonly IStationService _stationService;

        public StationController(IStationService stationService)
        {
            _stationService = stationService;
        }

        [HttpGet("id", Name = "GetStation")]
        public async Task<IActionResult> GetStationAsync(string id)
        {
            var result = await _stationService.GetStationAsync(id);

            return Ok(result);
        }

        [HttpGet(Name = "GetStations")]
        public async Task<IActionResult> GetStationsAsync()
        {
            var result = await _stationService.GetStationsAsync();

            return Ok(result);
        }

        [HttpPost(Name = "CreateStation")]
        public async Task<IActionResult> CreateStationAsync([FromBody] StationModel station)
        {
            await _stationService.CreateStationAsync(station);

            return Ok();
        }

        [HttpPost("list", Name = "CreateStations")]
        public async Task<IActionResult> CreateStationsAsync([FromBody] IEnumerable<StationModel> stations)
        {
            await _stationService.CreateStationsAsync(stations);

            return Ok();
        }

        [HttpPut("{id}", Name = "UpdateStation")]
        public async Task<IActionResult> UpdateStationAsync([FromBody] StationModel station)
        {
            await _stationService.UpdateStationAsync(station);

            return Ok();
        }

        [HttpDelete("{id}", Name = "DeleteStation")]
        public async Task<IActionResult> DeleteStationAsync(string id)
        {
            await _stationService.DeleteStation(id);

            return Ok();
        }
    }
}
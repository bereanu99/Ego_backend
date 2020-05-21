using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ego_station.Interfaces;
using ego_station.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ego_station.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        public ICarService _carService;

        public CarController(ICarService CarService)
        {
            _carService = CarService;
        }

        [HttpGet("{id}", Name = "GetCar")]
        public async Task<IActionResult> GetCarAsync(string id)
        {
            var result = await _carService.GetCarAsync(id);

            return Ok(result);
        }

        [HttpPut(Name = "UpdateCar")]
        public async Task<IActionResult> Updatecar([FromBody] CarModel car)
        {
            await _carService.UpdateCarASync(car);
            
            return Ok();
        }

        [HttpDelete("{id}", Name = "DeleteCar")]
        public async Task<IActionResult> DeleteCar(string id)
        {
            await _carService.DeleteCar(id);

            return Ok();
        }
    }
}

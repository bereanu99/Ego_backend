using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ego_station.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult GetHome()
        {
            var message = new
            {
                message = "The API is up and running. Created by MARIUSIKA "
            };
            return Ok(message);
        }
    }
}
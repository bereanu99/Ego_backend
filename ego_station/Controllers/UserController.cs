using ego_station.Interfaces;
using ego_station.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService UserService)
        {
            _userService = UserService;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUserAsync(string id)
        {
            var result = await _userService.GetUser(id);

            return Ok(result);
        }

        [HttpPost("auth", Name = "AuthUser")]
        public async Task<IActionResult> AuthUser([FromBody] CredentialsModel credentials)
        {
            var auth = await _userService.AuthUser(credentials);


            if (auth == null)
            {
                return Unauthorized();
            }

            return Ok(auth);
        }

        [HttpGet(Name = "GetUsers")]
        public async Task<IActionResult> GetUsersAsync()
        {
            var result = await _userService.GetUsers();

            return Ok(result);
        }

        [HttpPost("register",Name = "RegisterUser")]
        public async Task<IActionResult> AddUserAsync([FromBody] UserModel user)
        {
            await _userService.CreateUser(user);

            return Ok();
        }
    }
}
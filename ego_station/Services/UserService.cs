using ego_station.Interfaces;
using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ego_station.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRespository;
        private readonly ICarRepository _carRepository;

        public UserService(IUserRepository userRepository, ICarRepository carRepository)
        {
            _userRespository = userRepository;
            _carRepository = carRepository;
        }

        public async Task<UserModel> GetUser(string id)
        {
            var result = await _userRespository.GetUserAsync(id);

            return result;
        }

        public async Task<UserModel> GetUserByEmail(string email)
        {

            var result = await _userRespository.GetUserByEmailAsync(email);

            return result;
        }

        public async Task<List<UserModel>> GetUsers()
        {
            var result = await _userRespository.GetUsersAsync();

            return result;
        }

        public async Task CreateUser(UserModel User)
        {
            User.UserId = Guid.NewGuid().ToString();
            User.CarId = Guid.NewGuid().ToString();
            var car = new CarModel { CarId = User.CarId };

            await _userRespository.AddUserAsync(User);
            await _carRepository.AddCarASync(car);
        }

        public async Task<UserModel> AuthUser(CredentialsModel credentials)
        {
            var account = await _userRespository.GetAuthenticatedUserAsync(credentials.email, credentials.password);

            return account;
        }

        public async Task UpdateUser(UserModel User)
        {
            await _userRespository.UpdateUser(User);
        }
    }
}

using ego_station.Interfaces;
using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carRepository;
        private readonly IUserRepository _userRepository;

        public CarService(ICarRepository carRepository, IUserRepository userRepository)
        {
            _carRepository = carRepository;
            _userRepository = userRepository;
        }

        public async Task CreateCarASync(string userId, CarModel Car)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteCar(string id)
        {
            await _carRepository.DeleteCar(id);
        }

        public async Task<CarModel> GetCarAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateCarASync(string userId, CarModel Car)
        {
            await _carRepository.UpdateCarASync(Car);
        }
    }
}

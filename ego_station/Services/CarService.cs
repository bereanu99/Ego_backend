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

        public CarService(ICarRepository CarRepository)
        {
            _carRepository = CarRepository;
        }

        public async Task CreateCarASync(CarModel Car)
        {
           await _carRepository.AddCarASync(Car);
        }

        public async Task DeleteCar(string id)
        {
            await _carRepository.DeleteCar(id);
        }

        public async Task<CarModel> GetCarAsync(string carId)
        {
            var result = await _carRepository.GetCarAsync(carId);
            
            return result;
        }

        public async Task UpdateCarASync(CarModel Car)
        {
            await _carRepository.UpdateCarASync(Car);
        }
    }
}

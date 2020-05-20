using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Interfaces
{
    public interface ICarRepository
    {
        Task AddCarASync(CarModel Car);

        Task UpdateCarASync(CarModel Car);

        Task DeleteCar(string id);

        Task<CarModel> GetCarAsync(string id);
    }
}

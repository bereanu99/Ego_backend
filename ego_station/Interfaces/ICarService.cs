using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Interfaces
{
    public interface ICarService
    {
        Task CreateCarASync(string userId, CarModel Car);

        Task UpdateCarASync(string userId,CarModel Car);

        Task DeleteCar(string id);

        Task<CarModel> GetCarAsync(string userId);
    }
}

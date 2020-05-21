using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Infrastructure
{
    public interface IStationRepository
    {
        Task<List<StationModel>> GetStationsAsync();

        Task AddStationAsync(StationModel Station);

        Task AddStationsAsync(IEnumerable<StationModel> stations);

        Task UpdateStationAsync(StationModel Station);

        Task DeleteStation(string id);

        Task<StationModel> GetStationAsync(string id);
    }
}

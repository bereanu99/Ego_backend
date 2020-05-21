using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Infrastructure
{
    public interface IStationService
    {
        Task CreateStationAsync(StationModel Station);
        Task CreateStationsAsync(IEnumerable<StationModel> stations);

        Task UpdateStationAsync(StationModel Station);
        
        Task DeleteStation(string id);
        
        Task<List<StationModel>> GetStationsAsync();
        
        Task<StationModel> GetStationAsync(string id);
    }
}

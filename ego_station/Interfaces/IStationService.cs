using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Infrastructure
{
    public interface IStationService
    {
        Task CreateStationnASync(StationModel Station);

        Task UpdateStationASync(StationModel Station);
        
        Task DeleteStation(string id);
        
        Task<List<StationModel>> GetStationsAsync(MapCoordinates MapCoordinates);
        
        Task<StationModel> GetStationAsync(string id);
    }
}

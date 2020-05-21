using ego_station.Infrastructure;
using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Services
{
    public class StationService : IStationService
    {
        private readonly IStationRepository _stationRepository;

        public StationService(IStationRepository StationRepository)
        {
            _stationRepository = StationRepository;
        }

        public async Task CreateStationAsync(StationModel Station)
        {
            Station.StationId = Guid.NewGuid().ToString();
            await _stationRepository.AddStationAsync(Station);
        }

        public async Task CreateStationsAsync(IEnumerable<StationModel> Stations)
        {
            Stations.ToList().ForEach((s) =>
                s.StationId = Guid.NewGuid().ToString()
            );

            await _stationRepository.AddStationsAsync(Stations);
        }


        public async Task DeleteStation(string id)
        {
            await _stationRepository.DeleteStation(id);
        }

        public async Task<StationModel> GetStationAsync(string id)
        {
            var result = await _stationRepository.GetStationAsync(id);

            return result;
        }

        public async Task<List<StationModel>> GetStationsAsync()
        {
            var result = await _stationRepository.GetStationsAsync();

            return result;
        }

        public async Task UpdateStationAsync(StationModel Station)
        {
            await _stationRepository.UpdateStationAsync(Station);
        }
    }
}

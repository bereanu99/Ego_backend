using ego_station.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Infrastructure
{
    public class StationRepository : IStationRepository
    {
        private IMongoCollection<StationModel> _stationsRepository;

        public StationRepository(IConfiguration config)
        {
            var stationCollection = config["EgoStationDatabaseSettings:ElectricStationsCollectionName"];
            var databaseName = config["EgoStationDatabaseSettings:DatabaseName"];
            var connectionString = config["EgoStationDatabaseSettings:ConnectionString"];

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _stationsRepository = database.GetCollection<Models.StationModel>(stationCollection);
        }

        public async Task AddStationASync(StationModel Station)
        {
            try
            {
                await _stationsRepository.InsertOneAsync(Station);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task AddStationAsync(StationModel Station)
        {
            await _stationsRepository.InsertOneAsync(Station);
        }

        public async Task AddStationsAsync(IEnumerable<StationModel> stations)
        {   
            await _stationsRepository.InsertManyAsync(stations);
        }

        public async Task DeleteStation(string id)
        {
            try
            {
                await _stationsRepository.DeleteOneAsync(l => l.StationId == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<StationModel> GetStationAsync(string id)
        {
            var station = await _stationsRepository.FindAsync(ac => ac.StationId == id);

            return station.FirstOrDefault();
        }

        public async Task<List<StationModel>> GetStationsAsync()
        {
            var stations = await _stationsRepository.Find(_ => true).ToListAsync();
            return stations;
        }

        public async Task UpdateStationAsync(StationModel Station)
        {
            var filter = Builders<Models.StationModel>.Filter.Eq(a => a.StationId, Station.StationId);
            await _stationsRepository.ReplaceOneAsync(filter, Station);
        }
    }
}

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
        private IMongoCollection<StationModel> _stations;

        public StationRepository(IConfiguration config)
        {
            var stationCollection = config["EgoStationDatabaseSettings:ElectricStationsCollectionName"];
            var databaseName = config["EgoStationDatabaseSettings:DatabaseName"];
            var connectionString = config["EgoStationDatabaseSettings:ConnectionString"];

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _stations = database.GetCollection<Models.StationModel>(stationCollection);
        }

        public async Task AddStationASync(StationModel Station)
        {
            try
            {
                await _stations.InsertOneAsync(Station);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task DeleteStation(string id)
        {
            try
            {
                await _stations.DeleteOneAsync(l => l.StationId.ToString() == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<StationModel> GetStationAsync(string id)
        {
            var station = await _stations.FindAsync(ac => ac.StationId.ToString() == id);

            return station.FirstOrDefault();
        }

        //to do later based on rectagle coor
        //public async Task<List<StationModel>> GetStationsAsync(MapCoordinates MapCoordinates)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task UpdateStationASync(StationModel Station)
        {
            var filter = Builders<Models.StationModel>.Filter.Eq(a => a.StationId.ToString(), Station.StationId.ToString());
            await _stations.ReplaceOneAsync(filter, Station);
        }
    }
}

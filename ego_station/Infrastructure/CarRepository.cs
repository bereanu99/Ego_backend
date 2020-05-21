using ego_station.Interfaces;
using ego_station.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Infrastructure
{
    public class CarRepository : ICarRepository
    {
        private IMongoCollection<CarModel> _cars;

        public CarRepository(IConfiguration config)
        {
            var carCollection = config["EgoStationDatabaseSettings:CarsCollectionName"];
            var databaseName = config["EgoStationDatabaseSettings:DatabaseName"];
            var connectionString = config["EgoStationDatabaseSettings:ConnectionString"];

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _cars = database.GetCollection<Models.CarModel>(carCollection);
        }
        public async Task AddCarASync(CarModel Car)
        {
            try
            {
                await _cars.InsertOneAsync(Car);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task DeleteCar(string id)
        {
            try
            {
                await _cars.DeleteOneAsync(l => l.CarId == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<CarModel> GetCarAsync(string id)
        {
            var car = await _cars.FindAsync(ac => ac.CarId == id);

            return car.FirstOrDefault();
        }

        public async Task UpdateCarASync(CarModel Car)
        {
            var filter = Builders<Models.CarModel>.Filter.Eq(a => a.CarId, Car.CarId);
            await _cars.ReplaceOneAsync(filter, Car);
        }
    }
}

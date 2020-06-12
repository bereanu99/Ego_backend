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
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<UserModel> _users;

        public UserRepository(IConfiguration config)
        {
            var usersCollection = config["EgoStationDatabaseSettings:UsersStationsCollectionName"];
            var databaseName = config["EgoStationDatabaseSettings:DatabaseName"];
            var connectionString = config["EgoStationDatabaseSettings:ConnectionString"];

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _users = database.GetCollection<Models.UserModel>(usersCollection);
        }

        public async Task AddUserAsync(UserModel user)
        {
            try
            {
                await _users.InsertOneAsync(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }

        }

        public async Task<UserModel> GetAuthenticatedUserAsync(string userLogin, string userPassword)
        {
            var existingUser = await _users.FindAsync(x => x.Password == userPassword &&  x.Email == userLogin);

            return existingUser.FirstOrDefault();
        }

        public async Task<UserModel> GetUserAsync(string id)
        {
            var User = await _users.FindAsync(ac => ac.UserId == id);

            return User.FirstOrDefault();
        }

        public async Task<List<UserModel>> GetUsersAsync()
        {
            var Users = await _users.FindAsync(acc => true);

            return Users.ToList();
        }

        public async Task UpdateUser(UserModel User)
        {
            var filter = Builders<UserModel>.Filter.Eq(a => a.UserId, User.UserId);
            await _users.ReplaceOneAsync(filter, User);
        }

        public async Task ValidateUser(string id)
        {
            var updateDef = Builders<Models.UserModel>.Update.Set("enabled", true);
            var filter = Builders<Models.UserModel>.Filter.Eq(a => a.UserId.ToString(), id);
            var result = await _users.UpdateOneAsync(filter, updateDef);

            if (result.ModifiedCount == 0)
            {
                throw new Exception("User already enabled");
            }

        }

        public async Task<UserModel> GetUserByEmailAsync(string email)
        {
            var User = await _users.FindAsync(ac => ac.Email == email);

            return User.FirstOrDefault();
        }
    }
}

using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Interfaces
{
    public interface IUserService
    {
        Task<UserModel> GetUser(string id);

        Task<UserModel> GetUserByEmail(string email);

        Task<List<UserModel>> GetUsers();

        Task CreateUser(UserModel User);

        Task<UserModel> AuthUser(CredentialsModel credentials);
    }
}

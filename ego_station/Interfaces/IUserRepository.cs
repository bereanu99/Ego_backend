using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Interfaces
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetUsersAsync();

        Task<UserModel> GetUserAsync(string id);

        Task<UserModel> GetUserByEmailAsync(string email);

        Task<UserModel> GetAuthenticatedUserAsync(string userLogin, string userPassword);

        Task AddUserAsync(UserModel User);

        Task UpdateUser(UserModel User);

        Task ValidateUser(string id);
    }
}

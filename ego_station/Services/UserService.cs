using ego_station.Interfaces;
using ego_station.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ego_station.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRespository;

        public UserService(IUserRepository userRepository )
        {
            _userRespository = userRepository;
        }


        //private static string CreateMD5(string input)
        //{
        //    // Use input string to calculate MD5 hash
        //    using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
        //    {
        //        byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
        //        byte[] hashBytes = md5.ComputeHash(inputBytes);

        //        // Convert the byte array to hexadecimal string
        //        StringBuilder sb = new StringBuilder();
        //        for (int i = 0; i < hashBytes.Length; i++)
        //        {
        //            sb.Append(hashBytes[i].ToString("X2"));
        //        }
        //        return sb.ToString();
        //    }

        //}

        public async Task<UserModel> GetUser(string id)
        {
            var result = await _userRespository.GetUserAsync(id);

            return result;
        }

        public async Task<UserModel> GetUserByEmail(string email)
        {

            var result = await _userRespository.GetUserByEmailAsync(email);

            return result;
        }

        public async Task<List<UserModel>> GetUsers()
        {
            var result = await _userRespository.GetUsersAsync();

            return result;
        }

        public async Task CreateUser(UserModel User)
        {
            await _userRespository.AddUserAsync(User);
        }
    }
}

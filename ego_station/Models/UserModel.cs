using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ego_station.Models
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public int UserId { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }
        
        [BsonElement("carId")]
        public int CarId { get; set; }
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Models
{
    public class CarModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string CarId { get; set; }

        [BsonElement("Brand")]
        public string Brand { get; set; }
        
        [BsonElement("Model")]
        public string Model { get; set; }

        [BsonElement("ChargeType")]
        public int ChargeType { get; set; }

        [BsonElement("Battery")]
        public int Battery { get; set; }
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ego_station.Models
{
    public class StationModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public int StationId { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Coordinates")]
        public MapCoordinates Coordinates { get; set; }      
        
        [BsonElement("Descritpion")]
        public string Descritpion { get; set; }

        [BsonElement("Status")]
        public int Status { get; set; }

        [BsonElement("ChargeType")]
        public int ChargeType { get; set; }    
        
        [BsonElement("Power")]
        public int Power { get; set; }
    }
}

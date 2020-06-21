using ego_station.Models;
using GoogleApi.Entities.Common;
using GoogleApi.Entities.Maps.Directions.Request;
using GoogleApi.Entities.Maps.Directions.Response;
using Newtonsoft.Json;
using System.Net.Http;

namespace ego_station.Services
{
    public class DirectionService
    {
        public const string googleUrl = "http://maps.googleapis.com/maps/api/directions/json?origin=";
        public DirectionsResponse GetDirections(DirectionModel directionModel)
        {
            DirectionsRequest request = new DirectionsRequest();

            request.Key = "AIzaSyA7N7PK0olNEkLval3s18qrKhONNS4tb68";

            request.Origin = new Location(directionModel.origin);
            request.Destination = new Location(directionModel.destination);

            var response = GoogleApi.GoogleMaps.Directions.Query(request);
            return response;
        }
    }
}

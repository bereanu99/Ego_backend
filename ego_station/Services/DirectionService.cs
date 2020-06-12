using ego_station.Models;
using GoogleApi.Entities.Common;
using GoogleApi.Entities.Maps.Directions.Request;
using GoogleApi.Entities.Maps.Directions.Response;
using System.Net.Http;

namespace ego_station.Services
{
    public class DirectionService
    {
        private static HttpClient client = new HttpClient();
        public const string googleUrl = "http://maps.googleapis.com/maps/api/directions/json?origin=";
        public DirectionsResponse GetDirections(DirectionModel directionModel)
        {

            DirectionsRequest request = new DirectionsRequest();

            request.Key = "AIzaSyA7N7PK0olNEkLval3s18qrKhONNS4tb68";

            request.Origin = new Location("Brasov");
            request.Destination = new Location("Merghindeal");

            var response = GoogleApi.GoogleMaps.Directions.Query(request);
            //HttpResponseMessage response = client.GetAsync(googleUrl + directionModel.origin + "&destination=" + directionModel.destination + "&key=AIzaSyA7N7PK0olNEkLval3s18qrKhONNS4tb68").Result;

            return response;
        }

    }
}

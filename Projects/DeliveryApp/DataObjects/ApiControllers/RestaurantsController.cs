using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using DeliveryApp.Data.Repository;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using System.Web.Http;
using DeliveryApp.Data.DTOs;

namespace DeliveryApp.Data.ApiControllers
{
    [Route("api/[controller]")] //host/api/Restraunts -base URI for all Restaurant Controllers
    [ApiController]
    class RestaurantsController : ApiController
    {
        private IRestaurantRepository _restaurantRepository; //inject this interface into this class + access all of its methods

        public RestaurantsController(IRestaurantRepository restaurantRepository)
        {
            _restaurantRepository = restaurantRepository; // inject + instantiate a concreate object of the interface = decoupling
        }

        //api/Restraunts
        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        public IActionResult GetRestaurants() 
        { 
            var allRestaurants= _restaurantRepository.GetRestaurants().ToList();    //Use method of repo to get all restaurants from the DB as a List

            //If result from DB is bad, Model state (part of controler) is invalid return bad request
            if (!ModelState.IsValid) return (IActionResult)BadRequest(ModelState);  //Adding ModelStae displays the actual error

            var restaurantDTO = new List<RestaurantDto>();

            foreach (var r in allRestaurants) { restaurantDTO.Add( new RestaurantDto{ID = r.ID, Name = r.Name}  );  }

            return (IActionResult)Ok(restaurantDTO);  //We want to return an Http status code Ok ...even if no restaurants in DB

        }

        //api/Restraunt/{RestrauntId or name}
        [HttpGet("{RestrauntId}", Name = "GetRestraunt")]   //Get has been appended to require an ID
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200)]
        public IActionResult GetRestaurant(int restaurantId)
        {
            if (!_restaurantRepository.RestaurantExists(restaurantId) ) //Diplay error if what they are looking for does not exist
                return (IActionResult)NotFound();

            var restaurant = _restaurantRepository.GetRestaurant(restaurantId); //Get a single restaurant based on what they pass

            //If result from DB is bad, Model state (part of controler) is invalid return bad request
            if (!ModelState.IsValid)  return (IActionResult)BadRequest(ModelState);

            var restaurantDto = new RestaurantDto { ID = restaurant.ID, Name = restaurant.Name }; //pass the(1) restaurant to be displayed as a DTO

            return (IActionResult)Ok(restaurantDto);
        }
    }
}

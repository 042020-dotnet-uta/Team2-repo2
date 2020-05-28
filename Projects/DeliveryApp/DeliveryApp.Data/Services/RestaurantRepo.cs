using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Data.Services
{
	public class RestaurantRepo : IRestaurantRepo
	{
		private DeliveryContext _restaurantContext;

        public RestaurantRepo(DeliveryContext restaurantContext)
        {
			_restaurantContext = restaurantContext;
		}


	}
}

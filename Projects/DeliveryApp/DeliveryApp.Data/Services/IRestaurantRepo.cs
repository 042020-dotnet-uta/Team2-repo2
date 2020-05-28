using System;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Data.Services
{
	public interface IRestaurantRepo
	{
        ICollection<Restaurant> GetRestaurants();
        Restaurant GetRestaurant(int RestaurantId);     
        
        bool RestaurantExists(int RestaurantId);   

        bool CreateRestaurant(Restaurant restaurant);
        bool UpdateRestaurant(Restaurant restaurant);
        bool DeleteRestaurant(Restaurant restaurant);
        bool Save();
    }
}

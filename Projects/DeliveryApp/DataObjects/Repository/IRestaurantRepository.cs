using DeliveryApp.Data.Objects;
using System;
using System.Collections.Generic;
using System.Text;

namespace DeliveryApp.Data.Repository
{
    //We need to use an interface to figure out what methods we need to implement for CRUD + allows us to use DI later
    interface IRestaurantRepository
    {
        ICollection<Restaurant> GetRestaurants();
        Restaurant GetRestaurant(int restaurantId);
        bool RestaurantExists(int restaurantId);
        bool IsDuplicateRestaurantName(int RestaurantId, string RestaurantName);
        bool CreateRestaurant(Restaurant restaurant);
        bool UpdateRestaurant(Restaurant restaurant);
        bool DeleteRestaurant(Restaurant restaurant);
        bool Save();
    }
}

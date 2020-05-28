using DeliveryApp.Data.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DeliveryApp.Data.Repository
{
    class RestaurantRepository : IRestaurantRepository
    {
        private DeliveryContext _restaurantContext; //We need this to interact with the DB

        public RestaurantRepository(DeliveryContext restaurantContext)
        {
            _restaurantContext = restaurantContext; //This is how you bring an instance of the Context into the class
        }
        public bool CreateRestaurant(Restaurant restaurant)
        {
            _restaurantContext.Restaurants.Add(restaurant);
            return Save();
        }

        public bool DeleteRestaurant(Restaurant restaurant)
        {
            _restaurantContext.Remove(restaurant);
            return Save();
        }
        /// <summary>
        /// Gets a single Restaurant by whatever id is passed, assuming it matches
        /// </summary>
        /// <param name="restaurantId"></param>
        /// <returns></returns>
        public Restaurant GetRestaurant(int restaurantId)
        {
            //From the context we are using the Restaurants DbSet + filtered to match whatever id is passed 
            return _restaurantContext.Restaurants.Where(r => r.ID == restaurantId).FirstOrDefault();    //FOD()= return 1st match or, null if no Restaurant is found
        }

        /// <summary>
        /// Gets all Restaurants from the DB
        /// </summary>
        /// <returns>Returns results of Linq query, all Restaurants by Name from the DB (a-z)</returns>
        public ICollection<Restaurant> GetRestaurants()
        {
            //From the context we are using the Restaurants DbSet
            return _restaurantContext.Restaurants.OrderBy(r => r.Name).ToList();    
        }

        public bool IsDuplicateRestaurantName(int RestaurantId, string RestaurantName)
        {
            var theRestaurant = _restaurantContext.Restaurants.Where(r => r.Name.Trim().ToUpper() == 
            RestaurantName.Trim().ToUpper() && r.ID != RestaurantId).FirstOrDefault();

            return theRestaurant == null ? false : true;
        }

        public bool RestaurantExists(int restaurantId)
        {
            //From the context we are using the Restaurants DbSet ... ANY checks if any single ID in our DB match what we are passing
            return _restaurantContext.Restaurants.Any(r => r.ID == restaurantId);
        }

        public bool Save()
        {
            var saved = _restaurantContext.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public bool UpdateRestaurant(Restaurant restaurant)
        {
            _restaurantContext.Update(restaurant);
            return Save();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using DeliveryApp.Web;
using DeliveryApp.Data;
using Xunit;
using DeliveryApp.Data.Objects;
using DeliveryApp.Web.ApiController;

namespace DeliveryApp.Test
{
    public class UnitTesting
    {
        [Fact]
        public void CheckCategoryIsExist_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            //Setup in memory database 
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

            // we need to seed the in-memory test database
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);
            // Assign values to category object and this object store in memory database
            var category = new Category() { Name = "Test1", Description = "Description Test1", RestaurantID = 1 };
            DeliveryContext.Categories.Add(category);
            DeliveryContext.SaveChanges();

            // Initialize CategoriesController and put our inMemory context to its constructor
            var controller = new CategoriesController(DeliveryContext);

            //assert
            //check category is exist or not
            var returnData = controller.CategoryExists(1);  //auto-generate from teh DB is 1 since we only created 1 record

            // We are confirming here the category is exist or not, actually CategoryExists return as true or false. 
            Assert.True(returnData == true);
        }

       
    }
}

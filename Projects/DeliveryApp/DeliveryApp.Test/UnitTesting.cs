using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using DeliveryApp.Web;
using DeliveryApp.Data;
using Xunit;
using DeliveryApp.Data.Objects;
using DeliveryApp.Web.ApiController;

using System.ComponentModel;
using System.Linq;

namespace DeliveryApp.Test
{
    public class UnitTesting
    {
        [Fact]
        public void CheckCategoryIsExist_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            // arrange
            //Setup in memory database 
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

            // we need to seed the in-memory test database
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);

            // act
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
        [Fact]
        public void GetItemById_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            // arrange
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

            
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);
            // act
            var item = new Item() { Name = "Small Cup", Description = "Cup Description", CategoryID = 1, Price = 30 };
            DeliveryContext.Items.Add(item);
            DeliveryContext.SaveChanges();

            //As we have joined of item with category like Include(x => x.Category) in ItemsController GetItem method
            // So also adding category object to in memory database 
            var category = new Category() { Name = "Cups", Description = "Description Test1", RestaurantID = 1 };
            DeliveryContext.Categories.Add(category);
            DeliveryContext.SaveChanges();

            // Initialize CategoriesController and put our inMemory context to its constructor
            var controller = new ItemsController(DeliveryContext);

            //assert        
            var returnData = controller.GetItem(1);//Getting itemById
            // We are confirming here the return data is of type item and also confirming data will return back or not
            Item returnValue = Assert.IsType<Item>(returnData.Result.Value);
            Assert.True(returnValue.Name == "Small Cup");
        }
        [Fact]
        public void GetCategories_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            // arrange
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

            // act
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);
            // Assign values to category object and this object store in memory database
            var category = new Category() { Name = "Test1", Description = "Description Test1", RestaurantID = 1 };
            DeliveryContext.Categories.Add(category);
            DeliveryContext.SaveChanges();

            // Initialize CategoriesController and put our inMemory context to its constructor
            var controller = new CategoriesController(DeliveryContext);

            //assert
            //Getting list of categories
            var returnData = controller.GetCategories();
            // We confirm here the return list is of type category + confirm data will return back or not
            List<Category> returnValue = Assert.IsType<List<Category>>(returnData.Result.Value);
            Assert.True(returnValue.FirstOrDefault().Name == "Test1");
        }
        [Fact]
        public void CheckDeleteAddress_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            // arrange
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

            // act
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);
            // Assign values to address object -> this object store in memory database
            var address = new Address() { Address1 = "Test1", Address2 = "Test2", City = "Lahore", State = "Punjab", ZipCode = "54000" };
            DeliveryContext.Addresses.Add(address);
            DeliveryContext.SaveChanges();

            // Initialize AddressesController and put our inMemory context to its constructor
            var controller = new AddressesController(DeliveryContext);

            //ASSERT
            //check Addresses is exist or not
            var returnData = controller.DeleteAddress(1);
            // We are confirming here the deleted object is of type address. 
            Assert.IsType<Address>(returnData.Result.Value);
        }
        [Fact]
        public void PostOrderAssignmentReason_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            // arrange
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

            // act
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);
            // Assign values to OrderAssignmentReason object -> object store in memory database
            var orderAssignmentReason = new OrderAssignmentReason() { Reason = "Good People", Description = "Polite" };

            // Initialize OrderAssignmentReasonController and put our inMemory context to its constructor
            var controller = new OrderAssignmentReasonsController(DeliveryContext);

            //ASSERT
            //passing object for post method
            var returnData = controller.PostOrderAssignmentReasonForAPITest(orderAssignmentReason);
            // We are confirming here the created object is of type OrderAssignmentReason. 
            Assert.IsType<OrderAssignmentReason>(returnData.Result.Value);
        }
        [Fact]
        public void GetOrderAssignment_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            // arrange
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

           
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);
            // act
            var list = new List<OrderAssignmentReason>()
            {
                new OrderAssignmentReason { Reason = "Test1" , Description= "Test1 Description"},
                new OrderAssignmentReason { Reason = "Test2" , Description= "Test2 Description"}
            };

            DeliveryContext.OrderAssignmentReasons.AddRange(list);
            DeliveryContext.SaveChanges();

            // Initialize OrderAssignmentReasonsController -> inMemory context to its constructor
            var controller = new OrderAssignmentReasonsController(DeliveryContext);

            //assert
            //Getting list of OrderAssignmentReasons
            var returnData = controller.GetOrderAssignmentReasons();
            // We confirm here the return list is of type OrderAssignmentReason and also confirm data will return back or not
            List<OrderAssignmentReason> returnValue = Assert.IsType<List<OrderAssignmentReason>>(returnData.Result.Value);
            // Confirming here the count should be two as we are adding above two objects in inMemory database
            Assert.True(returnValue.Count == 2);
        }
        [Fact]
        public void PutOrder_WhenCalledWithInMemoryDataContext_ReturnsExpectedResult()
        {
            // arrange
            var inMemoryDataContextOptions = new DbContextOptionsBuilder<DeliveryContext>()
                .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
                .Options;

            // act
            var DeliveryContext = new DeliveryContext(inMemoryDataContextOptions);
            // Assign values to Orders object and this object store in memory database
            var order = new Order() { ID = 1, CustomerID = 1, DriverID = 1, LocationID = 1, PreparerID = 1 };
            DeliveryContext.Orders.Add(order);
            DeliveryContext.SaveChanges();

            // Initialize OrdersController and put our inMemory context to its constructor
            var controller = new OrdersController(DeliveryContext);

            //assert
            //passing object for post method
            var returnData = controller.PutOrder(1, order);
            // We are confirming here the PutOrder() method should return nothing as no content. 
            Assert.NotNull(returnData.Result);
        }


    }
}

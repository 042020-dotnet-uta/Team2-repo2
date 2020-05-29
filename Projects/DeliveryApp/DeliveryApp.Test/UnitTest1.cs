using System;
using Xunit;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DeliveryApp.Data.Objects;
using DeliveryApp.Data;

namespace DeliveryApp.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            var options = new DbContextOptionsBuilder<DeliveryContext>()
                            .UseInMemoryDatabase(databaseName: "test_database")
                            .Options;
            using(var context = new DeliveryContext(options)) {
                // REPO

                context.Users.Add(new User());
                context.Users.Add(new User());
                context.SaveChanges();

                Assert.Equal(2, context.Users.ToList().Count());
            }
        }
    }
}

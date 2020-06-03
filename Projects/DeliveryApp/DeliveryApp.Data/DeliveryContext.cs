using Microsoft.EntityFrameworkCore;
using DeliveryApp.Data.Objects;


namespace DeliveryApp.Data
{
    public class DeliveryContext : DbContext {
        public DeliveryContext() {
        }
        
        public DeliveryContext (DbContextOptions<DeliveryContext> options) : base(options) {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderAssignment> OrderAssignments { get; set; }
        public DbSet<OrderAssignmentReason> OrderAssignmentReasons { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                // TODO Move to some properties file?
                 options.UseSqlServer("Server=tcp:ryanoxford.database.windows.net,1433;Initial Catalog=DeliveryApp;Persist Security Info=False;User ID=ryanoxford;Password=PickledTubas!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                
                
                //--- My Local Server    options.UseSqlServer("Server=DESKTOP-KGITG3T;Database=Test_DeliveryApp;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            // 
        }

    }
}

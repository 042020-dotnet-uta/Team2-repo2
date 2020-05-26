using Microsoft.EntityFrameworkCore;

namespace DeliveryApp.Data
{
    public class DeliveryContext : DbContext {
        public DeliveryContext() {
        }
        
        public DeliveryContext (DbContextOptions<DeliveryContext> options) : base(options) {
        }

        // public DbSet<Customer> Customers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                // TODO Move to some properties file?
                // options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=business;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            // 
        }

    }
}

using ClaimIt.Models;
using Microsoft.EntityFrameworkCore;

namespace claimit_api.Context
{
    public class ClaimItContext : DbContext
    {
        public DbSet<Airdrops>? Airdrops { get; set; }
        public DbSet<Suggestions>? Suggestions { get; set; }
        public DbSet<Wallets>? Wallets { get; set; }
        public DbSet<Tasks>? Tasks { get; set; }
        public DbSet<User>? Users{ get; set; }
        public DbSet<Subscription>? Subscriptions { get; set; }

        public ClaimItContext(DbContextOptions<ClaimItContext> options) : base(options)
        {
        }
    }
}
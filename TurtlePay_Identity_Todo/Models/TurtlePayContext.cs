namespace TurtlePay_Identity_Todo.Models
{
    using System.Data.Entity;
    public class TurtlePayContext : DbContext
    {

        public TurtlePayContext()
            : base("TurtlePayContext")
        {
        }

        static TurtlePayContext()
        {
            //Added to branch
            //Database.SetInitializer(new TodoDatabaseInitializer());
            //Database.SetInitializer();
        }
        public static TurtlePayContext Create()
        {
            return new TurtlePayContext();
        }
        public DbSet<Groups> Groups { get; set; }
        public DbSet<vGroups> vGroups { get; set; }

    }
}


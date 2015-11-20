namespace Todo.Models
{
    using System.Data.Entity;

    public class TodosContext : DbContext 
    {
        // DEVELOPMENT ONLY: initialize the database
        static TodosContext()
        {
            //Added to branch
            //Database.SetInitializer(new TodoDatabaseInitializer());
            //Database.SetInitializer();
        }
        public DbSet<TodoItem> Todos { get; set; }
    }
}
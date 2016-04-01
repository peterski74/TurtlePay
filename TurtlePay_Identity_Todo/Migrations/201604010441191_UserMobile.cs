namespace TurtlePay_Identity_Todo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserMobile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Mobile", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Mobile");
        }
    }
}

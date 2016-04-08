namespace TurtlePay_Identity_Todo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MoreUserProperties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "CreatedBy", c => c.String());
            AddColumn("dbo.AspNetUsers", "CreatedDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "Active", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "Deleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Deleted");
            DropColumn("dbo.AspNetUsers", "Active");
            DropColumn("dbo.AspNetUsers", "CreatedDate");
            DropColumn("dbo.AspNetUsers", "CreatedBy");
        }
    }
}

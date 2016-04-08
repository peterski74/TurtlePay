namespace TurtlePay_Identity_Todo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserGivenAndFamilyName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "GivenName", c => c.String());
            AddColumn("dbo.AspNetUsers", "FamilyName", c => c.String());
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropColumn("dbo.AspNetUsers", "LastName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
            DropColumn("dbo.AspNetUsers", "FamilyName");
            DropColumn("dbo.AspNetUsers", "GivenName");
        }
    }
}

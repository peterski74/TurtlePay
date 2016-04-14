namespace TurtlePay_Identity_Todo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GroupAndOrgIds : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "GroupId", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "OrganisationId", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "ProfileCompleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "ProfileCompleted");
            DropColumn("dbo.AspNetUsers", "OrganisationId");
            DropColumn("dbo.AspNetUsers", "GroupId");
        }
    }
}

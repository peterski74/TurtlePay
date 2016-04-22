using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace TurtlePay_Identity_Todo.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {

        //Custom user profile fields        
        public string GivenName { get; set; }
        public string FamilyName { get; set; }

        public string Mobile { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }

        public int GroupId { get; set; }
        public int OrganisationId { get; set; }
        public bool Active { get; set; }
       
        public bool Deleted { get; set; }
        public bool ProfileCompleted { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("TurtlePayContext", throwIfV1Schema: false)
        {
        }

        public IQueryable<Groups> Groups { get; set; }
        public IQueryable<vGroups> vGroups { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using TurtlePay_Identity_Todo.Models;
using Owin;
using System.Security.Claims;

[assembly: OwinStartupAttribute(typeof(TurtlePay_Identity_Todo.Startup))]
namespace TurtlePay_Identity_Todo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        
        }
        
    }
}

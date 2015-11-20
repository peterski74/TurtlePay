using Microsoft.Owin;
using Owin;

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

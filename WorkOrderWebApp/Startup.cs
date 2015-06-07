using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WorkOrderWebApp.Startup))]
namespace WorkOrderWebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}

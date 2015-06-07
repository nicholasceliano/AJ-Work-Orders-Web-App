using System.Web;
using System.Web.Optimization;

namespace WorkOrderWebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/thirdParty").Include(
                        "~/Scripts/jquery-{version}.js").Include(
                        "~/Scripts/jquery-ui-{version}.js").Include(
                        "~/Scripts/knockout-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/developed").Include(
                        "~/Scripts/Formatting.js").Include(
                        "~/Scripts/SearchPanel.js").Include(
                        "~/Scripts/PageData.js").Include(
                        "~/Scripts/WorkOrderModeling.js").Include(
                        "~/Scripts/ManageDevicesModeling.js").Include(
                        "~/Scripts/ReferenceDataModeling.js").Include(
                        "~/Scripts/UsersDataModeling.js").Include(
                        "~/Scripts/DialogBox.js").Include(
                        "~/Scripts/AdminPanel.js").Include(
                        "~/Scripts/JSONCalls.js"));

            bundles.Add(new StyleBundle("~/css").Include(
                        "~/Content/*.css"));

            BundleTable.EnableOptimizations = true;//change true in prod
        }
    }
}

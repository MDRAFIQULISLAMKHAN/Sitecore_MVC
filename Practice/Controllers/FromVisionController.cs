using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Practice.Models;
using Practice.Templates;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Foundation.SitecoreExtensions.Extensions;
using Sitecore.Mvc.Presentation;

namespace Practice.Controllers
{
    public class FromVisionController : Controller
    {
        // GET: FromVision
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Content()
        {
            var model = RenderingContext.Current?.Rendering?.Item;
            if (model == null)
            {
                return (Index());
            }
            Content content = new Content();
            content.Title = model.Fields[ContentTemplate.Content.Fields.Title].Value;
            content.SubTitle = model.Fields[ContentTemplate.Content.Fields.SubTitle].Value;
            content.TitleDescription = model.Fields[ContentTemplate.Content.Fields.TitleDescription].Value;
            return View("~/Views/FromVision/FromVisionContent.cshtml",content);
        }

        public ActionResult Tab()
        {
            List<FromVisionTab> formTabs = new List<FromVisionTab>();
            var model = RenderingContext.Current?.Rendering?.Item;

            foreach (var item in model.Children.ToList())
            {
                FromVisionTab fromVision = new FromVisionTab();
                fromVision.Title = item.Fields[FromVisionTabTemplate.FromVisionTab.Fields.Title].Value;
                fromVision.Description = item.Fields[FromVisionTabTemplate.FromVisionTab.Fields.Description].Value;

                MultilistField tabItemsList = item.Fields[FromVisionTabTemplate.FromVisionTab.Fields.TabItems];
                fromVision.TabItems = tabItemsList?.GetItems().Select(x => new TabItems(x)).ToList();

                formTabs.Add(fromVision);
            }


            return View("~/Views/FromVision/FromVisionTab.cshtml",formTabs);
        }

    }
}
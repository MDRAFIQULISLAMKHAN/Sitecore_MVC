using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Practice.Models;
using Practice.Templates;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.Foundation.SitecoreExtensions.Extensions;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;

namespace Practice.Controllers
{
    public class HeaderController : Controller
    {
        // GET: Header
        public ActionResult Header()
        {
            return View();
        }
        public ActionResult RedSeaHeader()
        {
            List<HeaderButtonModel> headerButtonModels = new List<HeaderButtonModel>();
            var model = RenderingContext.Current?.Rendering?.Item;

            foreach (var item in model.Children.ToList())
            {
                HeaderButtonModel headerButton = new HeaderButtonModel();
                headerButton.Name = item.Fields[HeaderButtonTemplate.HeaderButton.Fields.Name].Value;
                headerButton.Location = item.Fields[HeaderButtonTemplate.HeaderButton.Fields.Location].Value;
                
                headerButtonModels.Add(headerButton);
            }

            return View(headerButtonModels);
        }
        
    }
}
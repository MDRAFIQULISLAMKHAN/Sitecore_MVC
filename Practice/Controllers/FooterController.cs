using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Practice.Models;
using Practice.Templates;
using Sitecore.Foundation.SitecoreExtensions.Extensions;
using Sitecore.Mvc.Presentation;

namespace Practice.Controllers
{
    public class FooterController : Controller
    {
        // GET: Footer
        public ActionResult Footer()
        {
            return View();
        }

        public ActionResult ReadSeaFooter()
        {
            var model = RenderingContext.Current?.Rendering?.Item;
            if (model == null)
            {
                return View();
            }
            Footer footer = new Footer();
            footer.BackgroundImage = model.ImageUrl(FooterTemplate.Footer.Fields.BackgroundImage);
            footer.Logo = model.ImageUrl(FooterTemplate.Footer.Fields.Logo);
            footer.CopyrightText = model.Fields[FooterTemplate.Footer.Fields.CopyrightText].Value;
            footer.TermsandCondition = model.Fields[FooterTemplate.Footer.Fields.TermsandCondition].Value;
            footer.PrivacyPolicy = model.Fields[FooterTemplate.Footer.Fields.PrivacyPolicy].Value;

            return View(footer);
        }
    }
}
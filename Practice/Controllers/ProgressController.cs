using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Practice.Models;
using Practice.Templates;
using Sitecore.Data.Fields;
using Sitecore.Foundation.SitecoreExtensions.Extensions;
using Sitecore.Mvc.Presentation;

namespace Practice.Controllers
{
    public class ProgressController : Controller
    {
        // GET: Progress
        public ActionResult Index()
        {
            List<ProgressModel> progressModels = new List<ProgressModel>();
            var model = RenderingContext.Current?.Rendering?.Item;

            foreach (var item in model.Children.ToList())
            {
                ProgressModel progress = new ProgressModel();
                progress.Title = item.Fields[ProgressTemplate.Progress.Fields.Title].Value;
                progress.TitleDescription = item.Fields[ProgressTemplate.Progress.Fields.TitleDescription].Value;
                progress.SubTitle = item.Fields[ProgressTemplate.Progress.Fields.SubTitle].Value;
                progress.Details = item.Fields[ProgressTemplate.Progress.Fields.Details].Value;
                progress.FirstImage = item.ImageUrl(ProgressTemplate.Progress.Fields.FirstImage);
                progress.SecoundImage = item.ImageUrl(ProgressTemplate.Progress.Fields.SecoundImage);

                progressModels.Add(progress);
            }


            return View("Index", progressModels);
        }
    }
}
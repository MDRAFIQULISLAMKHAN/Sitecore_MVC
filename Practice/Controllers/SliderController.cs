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
    public class SliderController : Controller
    {
        // GET: Slider
        public ActionResult Index()
        {
            List<SliderModel> sliderModels = new List<SliderModel>();
            var model = RenderingContext.Current?.Rendering?.Item;

            foreach (var item in model.Children.ToList())
            {
                SliderModel slider = new SliderModel();
                slider.Title = item.Fields[SliderTemplate.Slider.Fields.Title].Value;
                slider.Image = item.ImageUrl(SliderTemplate.Slider.Fields.Image);
                slider.Description = item.Fields[SliderTemplate.Slider.Fields.Description].Value;
                slider.Button = item.Fields[SliderTemplate.Slider.Fields.Button].Value;

                sliderModels.Add(slider);
            }

            return View(sliderModels);

        }
    }
}
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
    public class HeroBannerController : Controller
    {
        // GET: HeroBanner
        public ActionResult Index()
        {
            
            var model = RenderingContext.Current?.Rendering?.Item;
            if (model == null)
            {
                return View();
            }
            HeroBannerModel heroBanner = new HeroBannerModel();
            heroBanner.Title = model.Fields[HeroBannerTemplate.HeroBanner.Fields.Title].Value;
            heroBanner.Description = model.Fields[HeroBannerTemplate.HeroBanner.Fields.Description].Value;
            heroBanner.ButtonText = model.Fields[HeroBannerTemplate.HeroBanner.Fields.ButtonText].Value;
            heroBanner.ButtonLink = model.Fields[HeroBannerTemplate.HeroBanner.Fields.ButtonLink].Value;
            heroBanner.BackgroundImage = model.ImageUrl(HeroBannerTemplate.HeroBanner.Fields.BackgroundImage);
           



            return View(heroBanner);
        }

        public ActionResult HeroSlider()
        {


            List<HeroSliderModel> heroSliderModels = new List<HeroSliderModel>();
            var model = RenderingContext.Current?.Rendering?.Item;

            foreach (var sliderItem in model.Children.ToList())
            {
                HeroSliderModel sliders = new HeroSliderModel();
                sliders.Title = sliderItem.Fields[HeroSliderTemplate.HeroSlider.Fields.Title].Value;
                sliders.Description = sliderItem.Fields[HeroSliderTemplate.HeroSlider.Fields.Description].Value;
                //sliders.BackgroundVideo = sliderItem.MediaUrl(HeroSliderTemplate.HeroSlider.Fields.BackgroundVideo);
                sliders.BackgroundImage = sliderItem.ImageUrl(HeroSliderTemplate.HeroSlider.Fields.BackgroundImage);
                sliders.Button = sliderItem.Fields[HeroSliderTemplate.HeroSlider.Fields.Button].Value;

                var videoItem = sliderItem.Fields[HeroSliderTemplate.HeroSlider.Fields.BackgroundVideo].Value;

                if (!string.IsNullOrEmpty(videoItem))
                {
                    MediaItem video = Context.Database.GetItem(videoItem);
                    sliders.BackgroundVideo = MediaManager.GetMediaUrl(video);
                }

                heroSliderModels.Add(sliders);
            }

            return View(heroSliderModels);
        }
    }
}
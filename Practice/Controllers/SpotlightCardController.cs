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
    public class SpotlightCardController : Controller
    {
        // GET: SpotlightCard
        public ActionResult Index()
        {
            List<SpotlightCardModel> cards = new List<SpotlightCardModel>(); 
            var model = RenderingContext.Current?.Rendering?.Item;

            foreach (var spotligtCardItem in model.Children.ToList())
            {
                SpotlightCardModel card = new SpotlightCardModel();
                card.CardImage = spotligtCardItem.ImageUrl(SpotlightCardTemplate.SpotlightCard.Fields.CardImage);
                card.Title = spotligtCardItem.Fields[SpotlightCardTemplate.SpotlightCard.Fields.Title].Value;
                card.Description = spotligtCardItem.Fields[SpotlightCardTemplate.SpotlightCard.Fields.Description].Value;
                card.Link = spotligtCardItem.Fields[SpotlightCardTemplate.SpotlightCard.Fields.Link].Value;

                cards.Add(card);
            }

            return View(cards);
        }

    }
}
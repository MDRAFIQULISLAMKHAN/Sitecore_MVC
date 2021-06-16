using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Practice.Models;
using Sitecore;
using Sitecore.Data.Templates;
using Sitecore.Mvc.Presentation;
using Sitecore.Syndication;
using Template = Practice.Models.Template;

namespace Practice.Controllers
{
    public class HomeController : Controller
    {
        //public ActionResult Card()
        //{
        //    /*
        //    if (string.IsNullOrEmpty(RenderingContext.Current.Rendering.DataSource))
        //    {
        //        return Context.PageMode.IsExperienceEditor ? this.InfoMessage(new InfoMessage(NavigationConstants.NoMenuMessage, MessageType.Warning)) : null;
        //    }
        //    */
        //    List<Card> cards = new List<Card>();
        //    var model = RenderingContext.Current?.Rendering?.Item;

        //    foreach (var spotligt_card in model.Children.ToList())
        //    {
        //        Card kart = new Card();
        //        kart.Image = spotligt_card.Fields[Template.CardProgress.Fields.Image].Value;
        //        kart.Title = spotligt_card.Fields[Template.CardProgress.Fields.Title].Value;
        //        kart.TitleLogo = spotligt_card.Fields[Template.CardProgress.Fields.TitleLogo].Value;
        //        kart.Link = spotligt_card.Fields[Template.CardProgress.Fields.Link].Value;

        //        cards.Add(kart);
        //    }
        //    /*if (model == null || model.TemplateID != Template.ExploreTemplate.ExploreProgress.ExploreItemId)
        //    {
        //        return View(TrsdcConstants.HomeExplorerContent.ToString());
        //    }*/
        //    //Card card = new Card(model);
        //    //var rc = RenderingContext.CurrentOrNull;
        //    /*if (rc != null)
        //    {
        //        var parms = rc.Rendering.Parameters;
        //        explore.BackgroundColor = parms["BackgroundColor"];
        //    }*/



        //    return View(cards);
        //}
    }
}
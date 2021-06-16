using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Practice.Templates;
using Sitecore.Data.Items;
using Sitecore.Foundation.SitecoreExtensions.Extensions;
using Sitecore.Web.UI.WebControls;

namespace Practice.Models
{
    public class FromVisionTab
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<TabItems> TabItems { get; set; }
    }


    public class TabItems
    {
        public TabItems (Item item)
        {
            if (item == null)
            {
                return;
            }
            this.Title = item.Fields[FromVisionTabItemTemplate.FromVisionTabItem.Fields.Title].Value;
            this.Image = item.ImageUrl(FromVisionTabItemTemplate.FromVisionTabItem.Fields.Image);
            this.TotalNo = item.Fields[FromVisionTabItemTemplate.FromVisionTabItem.Fields.TotalNo].Value;
            this.PopupImage = item.ImageUrl(FromVisionTabItemTemplate.FromVisionTabItem.Fields.PopupImage);
            this.PopupLinks = item.Fields[FromVisionTabItemTemplate.FromVisionTabItem.Fields.PopupLinks].Value;
        }


        public string Title { get; set; }
        public string Image { get; set; }
        public string TotalNo { get; set; }
        public string PopupImage { get; set; }
        public string PopupLinks { get; set; }

    }


}
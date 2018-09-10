using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProductClass;
namespace Product_App.Controllers
{
    public class ActivityController : ApiController
    {
        [HttpGet]
        // api/Activity
        public IEnumerable<ActivityModel> getActivity()
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                return obj.ActivityModels.ToList();
            }
        }

        [HttpPost]
        public void postActivity([FromBody]ActivityModel ActivityObject)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                var productId = obj.ActivityModels.Max(p => p.ID);
                int maxId = Int32.Parse(productId.ToString());
                maxId = maxId + 1;
                obj.ActivityModels.Add(ActivityObject);
                obj.SaveChanges();
            }
        }
        [HttpPut]
        public void putActivity([FromBody]ProductItem item)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                if (item.ProductType == "book")
                {
                    var referneceobject = obj.ActivityModels.Find(item.ProductID);
                    string IsBooked = obj.ActivityModels.Find(item.ProductID).isBooked;
                    IsBooked = "true";
                    referneceobject.isBooked = IsBooked;
                    obj.SaveChanges();


                }
                if (item.ProductType == "save")
                {
                    var referneceobject = obj.ActivityModels.Find(item.ProductID);
                    string IsSaved = obj.ActivityModels.Find(item.ProductID).isSaved;
                    IsSaved = "true";
                    referneceobject.isSaved = IsSaved;
                    obj.SaveChanges();


                }
            }
        }
    }
}

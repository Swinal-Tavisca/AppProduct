using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProductClass;
namespace Product_App.Controllers
{
    public class CarController : ApiController
    {
        [HttpGet]
        ///api/Car
        public IEnumerable<CarModel> getCars()
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                return obj.CarModels.ToList();
            }
        }

        [HttpPost]
        public void postCars([FromBody]CarModel carObject)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                var productId = obj.CarModels.Max(p => p.ID);
                int maxId = Int32.Parse(productId.ToString());
                maxId = maxId + 1;
                obj.CarModels.Add(carObject);
                obj.SaveChanges();
            }
        }
        [HttpPut]
        public void putCar([FromBody]ProductItem item)
        {
            using (ProductManagementEntities obj = new ProductManagementEntities())
            {
                if (item.ProductType == "book")
                {
                    var referneceobject = obj.CarModels.Find(item.ProductID);
                    string IsBooked = obj.CarModels.Find(item.ProductID).isBooked;
                    IsBooked = "true"; 
                    referneceobject.isBooked = IsBooked;
                    obj.SaveChanges();


                }
                if(item.ProductType=="save")
                {
                    var referneceobject = obj.CarModels.Find(item.ProductID);
                    string IsSaved = obj.CarModels.Find(item.ProductID).isSaved;
                    IsSaved = "true";
                    referneceobject.isSaved = IsSaved;
                    obj.SaveChanges();


                }
            }
        }
    }
}

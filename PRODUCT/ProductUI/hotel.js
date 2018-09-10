function loadHotel() {
    var xhttp = new XMLHttpRequest();
    var resultSection=document.getElementById("productListHotel");
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        productListHotel=JSON.parse(this.responseText);
        productListHotel.forEach(product => {
                var content;
            content=
                "<div class='card'>" +
                    "<div class='row card-body'>" +
                        "<div class='col'><h5 class='card-title'>" + product.HotelName + "</h5>" +
                        "<div class='col'>" + " HOTEL NAME : " + product.HotelName + "</div>" +
                        "<div class='col'>" + " HOTEL TYPE : " + product.HoteType + "</div>" +
                        "<div class='col'>" + " HOTEL ID : " + product.ID + "</div>" +
                        "<div class='col'>" + " HOTEL LOCATION : " + product.HotelLocation + "</div>" +
                         "<div class='col'>" + " HOTEL PRICE : " + product.HotelPrice + "</div>" +
                         "<div class='col'>" + " NUMBER OF ROOM'S AVAILABLE : " + product.NoOfAvailableRooms + "</div>" ;
                    
                         if(product.isBooked=="false") {
                                content += "<input style='margin:10px' class='col btn btn-primary' type='button' value='Book' onclick=\"bookProduct(\'Car\',"+ product.ID + ")\" >"; 
                        }
                        else {
                                content += "<input style='margin:10px;' class='col btn btn-primary' type='button' value='Booked' onclick=\"bookProduct(\'Car\',"+ product.ID+ ")\" disabled>"; 
                        }
                        if(product.isSaved=="false") {
                                content += "<input style='margin:10px' class='col btn btn-success' type='button' value='Save' onclick=\"saveProduct(\'Car\',"+ product.ID + ")\">";
                        }
                        else {
                                content += "<input style='margin:10px' class='col btn btn-success' type='button' value='Saved' onclick=\"saveProduct(\'Car\',"+ product.ID + ")\" disabled>";
                        }
                    "</div>" +
                "</div>"
                   resultSection.innerHTML += content;       
        });
                            
        }
    };
    xhttp.open("GET", "http://localhost:64224/api/Hotel", true);
    xhttp.send();
    
}  
function postHotel()
{
     json = {
        "HotelName": document.getElementsByClassName("hotelpost")[0].value,
        "HoteType": document.getElementsByClassName("hotelpost")[1].value,
        "ID":document.getElementsByClassName("hotelpost")[2].value,
        "HotelLocation":document.getElementsByClassName("hotelpost")[3].value,
        "HotelPrice":document.getElementsByClassName("hotelpost")[4].value,
        "NoOfAvailableRooms":document.getElementsByClassName("hotelpost")[5].value,
        "isSaved": "1",
        "isBooked": "1"
        }
         json = JSON.stringify(json);
         var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText)
            }
        };
        xmlhttp.open("POST", "http://localhost:64224/api/Hotel", true);

        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlhttp.send(json);

}
function bookProduct(product,id)
{
        var url="http://localhost:64224/api/"+product;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT",url,true);
        xhttp.onload = function()
        {
            if(xhttp.readyState==4 && xhttp.status == "200")
            {
                alert(xhttp.responseText);
            }
            else
            {
                alert(xhttp.readyState);
            }
        }
        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        var selectedProduct = {
            ProductId : id,
            OperationType : "book"
        }
        xhttp.send(JSON.stringify(selectedProduct));
}

function saveProduct(product,id)
{
        var url="http://localhost:64224/api/"+product;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT",url,true);
        xhttp.onload = function()
        {
            if(xhttp.readyState==4 && xhttp.status == "200")
            {
                alert(xhttp.responseText);
            }
            else{
                alert(xhttp.readyState);
            }
        }
        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        var selectedProduct = {
        ProductID : id,
        ProductType : "save"
        }
        xhttp.send(JSON.stringify(selectedProduct));
}
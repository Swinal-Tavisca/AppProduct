function loadActivity() {
    var xhttp = new XMLHttpRequest();
    var resultSection=document.getElementById("productListActivity");
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        productListActivity=JSON.parse(this.responseText);
        productListActivity.forEach(product => {
                var content;
            content=
                "<div class='card'>" +
                    "<div class='row card-body'>" +
                        "<div class='col'><h5 class='card-title'>" + product.ActivityName + "</h5>" +
                        "<div class='col'>" + " ACTIVITY NAME : " + product.ActivityName + "</div>" +
                        "<div class='col'>" + " ACTIVITY TYPE : " + product.ActivityType + "</div>" +
                        "<div class='col'>" + " ACTIVITY ID : " + product.ID + "</div>" +
                        "<div class='col'>" + " ACTIVITY LOCATION : " + product.ActivityLocation + "</div>" +
                         "<div class='col'>" + " NUMBER OF PEOPLE : " + product.ActivityNoOfPeople + "</div>" ;
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
    xhttp.open("GET", "http://localhost:64224/api/Activity", true);
    xhttp.send();
    
}  
function postActivity()
{
     json = {
        "ActivityName": document.getElementsByClassName("activitypost")[0].value,
        "ActivityType": document.getElementsByClassName("activitypost")[1].value,
        "ID":document.getElementsByClassName("activitypost")[2].value,
        "ActivityLocation":document.getElementsByClassName("activitypost")[3].value,
        "ActivityNoOfPeople":document.getElementsByClassName("activitypost")[4].value,
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
        xmlhttp.open("POST", "http://localhost:64224/api/Activity", true);

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
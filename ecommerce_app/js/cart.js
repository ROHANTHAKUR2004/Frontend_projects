document.addEventListener("DOMContentLoaded", ()=>{

    function cartrapperitems(product , productquantitymapping){

        const orderdetailspro = document.createElement("div");
         orderdetailspro.classList.add("order-details-product","d-flex", "flex-row");
       

         const productdetailsproductimg = document.createElement("div");
         productdetailsproductimg.classList.add("order-details-product-img" ,"d-flex");
         const image =  document.createElement("img");
         image.src = product.image;
      
         const orderdetailsproductdata = document.createElement("div");
         orderdetailsproductdata.classList.add("order-details-product-data" ,"d-flex" ,"flex-column");
        const name = document.createElement("div");
          const pric = document.createElement("div");

         name.textContent = product.title;
         pric.textContent = product.price;

         const orderdetialsaction = document.createElement("div");
         orderdetialsaction.classList.add("order-details-product-actions", "d-flex", "flex-column");

         const orderquantity = document.createElement("div");
         orderquantity.classList.add("order-details-product-quantity");
       
         const quantitys = document.createElement("div");
         quantitys.textContent = " Quantity";
         quantitys.classList.add("fw-bold");


         const formgroup = document.createElement("div");
         formgroup.classList.add("form-group");
       

         const selectbtn = document.createElement("select");
         selectbtn.classList.add("form-select");
         for(let i=0; i<=10;i++){
            const optionbtn = document.createElement("option");
            optionbtn.textContent = i;
            optionbtn.value = i;
            if( i == productquantitymapping[product.id]){
                optionbtn.selected = true;
            }
            selectbtn.appendChild(optionbtn)
         }
        //   selectbtn.appendChild(optionbtn);
        //  selectbtn.appendChild(optionbtn);
        //  selectbtn.appendChild(optionbtn);
        //  selectbtn.appendChild(optionbtn);

       
         const removebtn = document.createElement("div");
         removebtn.classList.add("order-details-product-remove","btn", "btn-danger");
        removebtn.textContent = " Remove";


        orderdetailspro.appendChild( productdetailsproductimg );
        orderdetailspro.appendChild(orderdetailsproductdata );
        orderdetailspro.appendChild(orderdetialsaction);


        const hr = document.createElement("hr");
        document.getElementById("orderdetails").appendChild( orderdetailspro);
        document.getElementById("orderdetails").appendChild(hr);
  

        productdetailsproductimg.appendChild(image);

        formgroup.appendChild(selectbtn);


        orderdetailsproductdata.appendChild(name);
        orderdetailsproductdata.appendChild(pric);

        orderquantity.appendChild(quantitys);
        orderquantity.appendChild(formgroup);


        orderdetialsaction.appendChild(orderquantity);
         orderdetialsaction.appendChild(removebtn);


    }






     async function populatecart(){
        const cart = await fetchcartbyid(3);
     
         const cartproduct = cart.products;
        
       const productquantitymapping  = {};
         const productdownloadpromise = cartproduct.map(product =>{
               productquantitymapping[product.productId] = product.quantity;
             return fetchproductbyid(product.productId);

         });
        
         const products = await Promise.all(productdownloadpromise);
         let totalprice = 0;
        products.forEach(product => {
            cartrapperitems(product , productquantitymapping);
            totalprice += product.price * productquantitymapping[product.id];
        });
        document.getElementById("totalprice").textContent = totalprice;
        document.getElementById("netprice").textContent = totalprice - 10;

        const loderbackdrop = document.getElementById("loder-backdrop");
        loderbackdrop.style.display = "none";
    }

     populatecart();

});
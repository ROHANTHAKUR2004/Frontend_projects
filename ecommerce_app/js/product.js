document.addEventListener("DOMContentLoaded", () =>{

   async function popproducts(){
        const queryParms = getqueryparms();
        if(queryParms[`id`]){

            const productid = queryParms[`id`]
            const product= await fetchproductbyid(productid);
            console.log(product);

            const productname = document.getElementById("product-name");
            const productprice = document.getElementById("product-price");
            const productdes = document.getElementById("product-description-data");
            const productimg= document.getElementById("product-img");


            productname.textContent = product.title;
            productdes.textContent = product.description;
            productprice.textContent = product.price;
            productimg.src = product.image;

            // loader remove

            const loderbackdrop = document.getElementById("loder-backdrop");
            loderbackdrop.style.display = "none";
        }
    }

    popproducts();

});
console.log("product list");

document.addEventListener("DOMContentLoaded" , async () =>{

    async function fetchproducts(){
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        return response.data;
        
    }



//fetchproducts();
    async function fetchproductsbycategory(category){
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log(response.data);
        return response.data;
    }

    async function fetchcategories() {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data =  await response.json();
    
        return data;
    }

    async function populateproduct(flag, customproducts){
       let products = customproducts;
       const queryparms = new URLSearchParams(window.location.search);
       const queryparmsobj = Object.fromEntries(queryparms.entries());
       if(flag == false){
         if(queryparmsobj[`category`]){

             products = await fetchproductsbycategory(queryparmsobj[`category`]);

         }
         else{
         products = await fetchproducts();
       }
    }

       

        const productlist = document.getElementById("productlist");


        products.forEach(product => {
            
            const productitem = document.createElement("a");
            productitem.target = "_blank";
            productitem.href = `product.html?id=${product.id}`;
            productitem.classList.add("product-item" ,"text-decoration-none" ,"d-inline-block");

            const productimg = document.createElement("div");
            const productname = document.createElement("div");
            const productprice = document.createElement("div");            

            productimg.classList.add("product-img");
            productname.classList.add("product-name" ,"text-center");
            productprice.classList.add("product-price","text-center");

            productname.textContent = product.title.substring(0 , 12) + "...";
            productprice.textContent = `₹ ${product.price}`;

            const imginsideproductimg = document.createElement("img");
            imginsideproductimg.src = product.image;

            // appending childs

            productimg.appendChild(imginsideproductimg);
            productitem.appendChild(productimg);
            productitem.appendChild(productname);
            productitem.appendChild(productprice);


            productlist.appendChild(productitem);
        });
    }

    async function populatecategories(){
        const categories = await fetchcategories();
        const categorylist = document.getElementById("category-list");
        categories.forEach(category =>{

            const categorylink = document.createElement("a");
            categorylink.classList.add("d-flex","text-decoration-none");
            categorylink.textContent = category;
            categorylink.href = `product_list.html?category=${category}`;
            
            categorylist.appendChild(categorylink);
        });
    }

    async function downloadandpopulate(){
    Promise.all([populateproduct(false),populatecategories()])
    .then(() => {
        const loderbackdrop = document.getElementById("loder-backdrop");
        loderbackdrop.style.display = "none";
    });
    }

    downloadandpopulate();

      

            const filterSearch = document.getElementById("search");
            filterSearch.addEventListener("click", async() => {
            const productlist = document.getElementById("productlist");
            const minprice = Number(document.getElementById("minprice").value);
            const maxprice = Number(document.getElementById("maxprice").value);
    
            const products = await fetchproducts();
            filterProducts = products.filter(product => product.price >= minprice && product.price <= maxprice);
                
            
            productlist.innerHTML = "";
            populateproduct(true, filterProducts);
     });


          const resetfilter = document.getElementById("clear");
          resetfilter.addEventListener("click", () => {
              window.location.reload();
          });


            });
    


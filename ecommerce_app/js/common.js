console.log("hey");

function getqueryparms(){
const queryparms = new URLSearchParams(window.location.search);
const queryparmsobj = Object.fromEntries(queryparms.entries());
return queryparmsobj;

}

async function fetchproductbyid(id){


    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return product.data;

}

async function fetchcartbyid(id){
    const cart = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return cart.data;
}
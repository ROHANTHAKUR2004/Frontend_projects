console.log("hey buddy");

async function fetchcategories() {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data =  await response.json();

    return data;
}

async function populatecategories(){
    const categories = await fetchcategories();
    const loderbackdrop = document.getElementById("loder-backdrop");
    loderbackdrop.style.display = "none";
    const categorylist = document.getElementById("category");
    categories.forEach(category => {
        const categoryholder = document.createElement("div");
        const categorylink = document.createElement("a");
         categorylink.href = `product_list.html?category=${category}`;
        // categorylink.href = "#";
        categorylink.textContent = category;

        categoryholder.classList.add("category-item","d-flex","align-items-center" ,"justify-content-center");
        categoryholder.appendChild(categorylink);
        categorylist.appendChild(categoryholder);


    });
}

populatecategories();

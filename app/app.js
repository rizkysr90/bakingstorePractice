// Navbar Toggle
const toggle = document.querySelector(".navbar-toggle");
toggle.addEventListener("click",function()
{
    toggle.classList.toggle("rotate-navbar");
    const expanded = document.querySelector(".links");
    expanded.classList.toggle("show-links");

});
// End Of Navbar

// Show Dropdown Category
const categoryDropdown = document.querySelector(".option");
categoryDropdown.addEventListener("click",function()
{
    const icon = document.querySelector(".option i");
    const expanded = document.querySelector(".category-list .dropdown");
    icon.classList.toggle("rotate-dropdown-icon");
    expanded.classList.toggle("show-dropdown");
})

// Showcase Products
let product;
const xhr = new XMLHttpRequest();
xhr.open("GET","../product.json");
xhr.responseType = "json";
xhr.onload = function()
{
  if(xhr.status === 200)
  {
    product = xhr.response;
    initialize();
  }else {
    alert("Fetching data is failed,Try again later");
  }
}
xhr.send();




function initialize()
{
    let finalGroup = product;
    let categoryGroup = [];
    let category = document.querySelector(".dropdown");
    let productShowcase = document.querySelector(".product-showcase");
    let searchTerm = document.querySelector("#searchTerms");
    let searchToggle = document.querySelector(".searchToggle");

    category.addEventListener("click",function(e)
    {
        e.preventDefault();
        let links = e.target.textContent.toLowerCase();
        console.log(links);
        if(links === "all")
        {
            finalGroup = product;
            updateDisplay();
        }
        else
        {
            
            product.forEach((elm,index) => {
                if(elm.type === links)
                {   
                    categoryGroup.push(elm);
                }
            });
           
            finalGroup = categoryGroup;
            console.log(finalGroup);
            updateDisplay();
            categoryGroup = [];
        }
    

    })
    searchToggle.addEventListener("click",function()
    {
        let searchType = searchTerm.value.toLowerCase();
        product.forEach((elm,index) => {
            let productName = elm.name.toLowerCase();
            if(productName.indexOf(searchType) !== -1)
            {
                categoryGroup.push(elm);
            }
        });
        finalGroup = categoryGroup;
        updateDisplay();
        categoryGroup = [];
        finalGroup = [];
        searchTerm.value = "";
    })
    // Buggy In Search input with enter keypress
    // searchTerm.addEventListener("keyup", function(event) {
    //     if (event.keyCode === 13) {
    //         event.preventDefault();
    //         let searchType = searchTerm.value.toLowerCase();
    //         product.forEach((elm,index) => {
    //             let productName = elm.name.toLowerCase();
    //             if(productName.indexOf(searchType) !== -1)
    //             {
    //                 categoryGroup.push(elm);
    //             }
    //         });
    //         finalGroup = categoryGroup;
    //         updateDisplay();
    //         categoryGroup = [];
    //         finalGroup = [];
    //         searchTerm.value = "";
    //         }
    //   });
 
    updateDisplay();




    function updateDisplay()
    {
        while(productShowcase.firstChild)
        {
            productShowcase.removeChild(productShowcase.firstChild);
        }
        if(finalGroup.length === 0) {
            var para = document.createElement('p');
            para.textContent = 'No results to display!';
            productShowcase.appendChild(para);
        // for each product we want to display, pass its product object to fetchBlob()
        } else {
            for(let i = 0; i < finalGroup.length; i++) {
            fetchBlob(finalGroup[i]);
            }
        }
    }
    function fetchBlob(product)
    {
        let url = "../img/" + product.image;
     

        let ajax = new XMLHttpRequest();
        ajax.open("GET",url);
        ajax.responseType = "blob"

        ajax.onload = function()
        {
            if(ajax.status === 200)
            {
                let objectURL = URL.createObjectURL(ajax.response);
                showProduct(objectURL,product);
            }else {
                alert("Fetching data is failed,Try again later");
            }
        }
        ajax.send();
    }

    function showProduct(objectURL,product)
    {
        let productCard = document.createElement("div");
        let productImage = document.createElement("div");
        let productDescribe = document.createElement("div");
        let nameProduct = document.createElement("p");
        let imgProduct = document.createElement("img");
        let priceProduct = document.createElement("h3");

        productCard.classList.add("product-card");
        productImage.classList.add("product-img");
        productDescribe.classList.add("product-describe");
        nameProduct.classList.add("name-product");
        priceProduct.classList.add("price-product");

        imgProduct.src= objectURL;
        imgProduct.alt = product.name;

        nameProduct.textContent = product.name;
        priceProduct.textContent = `Rp.${product.harga.toFixed(3)}`;

        productShowcase.appendChild(productCard);
        productCard.appendChild(productImage);
        productImage.appendChild(imgProduct);

        productCard.appendChild(productDescribe);
        productDescribe.appendChild(nameProduct);
        productDescribe.appendChild(priceProduct);
    }
}
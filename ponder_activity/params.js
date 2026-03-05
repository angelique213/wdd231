
const products = [
    { id: 1, name: "Product 1", price: 3, image: "https://placehold.co/300" },
    { id: 2, name: "Product 2", price: 5, image: "https://placehold.co/300" },
    { id: 3, name: "Product 3", price: 1, image: "https://placehold.co/300" }
  ];
  
  // Log the full URL object to inspect properties like .search
  console.log(window.location);
  
  // Function to get a specific parameter value from the URL
  function getParam(param) {
    // Gets the query string part of the URL (ex: "?productId=2")
    const paramString = window.location.search;
  
    // Creates a URLSearchParams object to work with query parameters
    const params = new URLSearchParams(paramString);
  
    // Returns the value of the requested parameter
    return params.get(param);
  }
  
  // Function that builds the HTML markup for a product
  function productTemplate(product) {
    return `
      <section class="product">
        <!-- Product image -->
        <img src="${product.image}" alt="${product.name}">
  
        <div class="product__details">
          <!-- Product name -->
          <h2>${product.name}</h2>
  
          <!-- Product price -->
          <p>Price: $${product.price}</p>
        </div>
      </section>
    `;
  }
  
  // Function to insert HTML into a selected element
  function output(selector, markup) {
    // Select the element (in this case, <main>)
    const element = document.querySelector(selector);
  
    // Insert the new HTML at the end without removing existing content
    element.insertAdjacentHTML("beforeEnd", markup);
  }
  
  // Main function to get product details from the URL and display them
  function getProductDetails() {
    // Get the productId from the URL
    const id = getParam("productId");
  
    // If no id exists in the URL, stop the function
    if (!id) return;
  
    // Find the product in the array that matches the id
    const product = products.find((p) => p.id == id);
  
    // If no product is found, stop the function
    if (!product) return;
  
    // Output the product HTML into the <main> element
    output("main", productTemplate(product));
  }
  
  // Call the function when the page loads
  getProductDetails();
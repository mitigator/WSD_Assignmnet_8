function fetchData(callback) {
    fetch("https://cynthiaesthermetilda.github.io/Xhrdemo/products.json")
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Network Error:");
        }
        return res.json();
      })
      .then(function (req) {
        callback(req);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }

  function display(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    products.forEach(function (product) {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      const productImage = document.createElement("img");
      productImage.src = product.imageUrl;
      productImage.alt = product.name;
      productCard.appendChild(productImage);
      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
      const productName = document.createElement("h2");
      productName.textContent = product.name;
      productDetails.appendChild(productName);
      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;
      productDetails.appendChild(productDescription);
      const productPrice = document.createElement("p");
      productPrice.textContent = "Price: $" + product.price.toFixed(2);
      productDetails.appendChild(productPrice);
      productCard.appendChild(productDetails);
      productContainer.appendChild(productCard);
    });
  }

  function filter(products, search, sort) {
    const filteredProducts = products.filter(function (product) {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    });
  
    const sortedProducts = filteredProducts.slice().sort(function (a, b) {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "price") {
        return a.price - b.price;
      }
    });
  
    return sortedProducts;
  }

  function handleSearch() {
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");
  
    fetchData(function (products) {
      const search = searchInput.value.toLowerCase();
      const sort = sortSelect.value;
      const searchedData = filter(products, search, sort);
      display(searchedData);
    });
  }

  document.getElementById("search-input").addEventListener("input", handleSearch);
  document.getElementById("sort-select").addEventListener("change", handleSearch);
  
  fetchData(function (products) {
    display(products);
  });
  
// Sample prices for each item
const prices = { 
    apple: 400, banana: 100, orange: 250, grape: 600, mango: 350, strawberry: 800, carrot: 150, 
    broccoli: 250, spinach: 100, potato: 80, tomato: 120, onion: 100, milk: 150, cheese: 500, 
    butter: 300, yogurt: 130, cream: 200, eggs: 30, chicken: 1200, beef: 2000, pork: 1800, 
    fish: 1500, flour: 200, sugar: 150, salt: 60, baking_powder: 100, oil: 300, yeast: 80 
  };
  
  // Initializing the cart as an empty array to store selected items
  let cart = [];
  let favourites = JSON.parse(localStorage.getItem("favouriteCart")) || [];
  
  // Function to handle item selection and quantity change
  function handleItemChange(category) {
    const selectElement = document.getElementById(category);
    const selectedItem = selectElement.value;
    const qtyElement = document.getElementById(`${category}Qty`);
    const quantity = parseFloat(qtyElement.value);
  
    if (!selectedItem || !quantity || quantity <= 0) return;
  
    const itemName = selectElement.options[selectElement.selectedIndex].text;
    const price = prices[selectedItem] * quantity;
  
    const itemIndex = cart.findIndex(item => item.item === itemName && item.category === category);
  
    if (itemIndex >= 0) {
      cart[itemIndex].quantity = quantity;
      cart[itemIndex].price = price;
    } else {
      cart.push({ item: itemName, category, quantity, price });
    }
  
    renderCart();
  }
  
  // Function to render the cart's content in the table
  function renderCart() {
    const tbody = document.querySelector("#cart tbody");
    tbody.innerHTML = ""; // Clearing existing rows from the cart table
  
    let total = 0; // Initializing the total price
  
    cart.forEach((item) => {
      total += item.price; // Accumulate the total price
  
      const row = `<tr>
          <td>${item.item}</td>
          <td>${item.category}</td>
          <td>${item.quantity} ${item.category === "dairy" || item.category === "baking" ? "pcs" : "kg"}</td>
          <td>Rs.${item.price.toFixed(2)}</td>
      </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  
    document.getElementById("totalPrice").textContent = `Rs.${total.toFixed(2)}`;
  
    if (cart.length === 0) {
      alert("Your cart is empty!");
    }
  }
  
 // Function to save the current cart as the user's favourites
function addToFavourites() {
    if (cart.length === 0) {
      alert("No items selected!"); // Alert if no items are in the cart
      return;
    }
  
    // Overwrite existing favourites with the current cart
    favourites = [...cart];
    localStorage.setItem("favouriteCart", JSON.stringify(favourites));
    alert("Items added to favourites!");
  }
  
  // Function to apply saved favourite items to the current cart
  function applyFavourites() {
    favourites = JSON.parse(localStorage.getItem("favouriteCart")) || [];
  
    if (favourites.length > 0) {
      cart = favourites.map(item => ({ ...item }));
      renderCart();
      fillFormWithFavourites();
    } else {
      alert("No favourite items found.");
    }
  }
  
  // Function to fill the form with favourite items
  function fillFormWithFavourites() {
    favourites.forEach(item => {
      const category = item.category;
      const selectElement = document.getElementById(category);
      const qtyElement = document.getElementById(`${category}Qty`);
  
      if (selectElement && qtyElement) {
        selectElement.value = item.item.toLowerCase();
        qtyElement.value = item.quantity;
      }
    });
  }
  
  // Function to proceed to the checkout process
  function proceedToCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    window.location.href = './payment.html'; 
  }
  
  // Adding event listeners for all dropdowns and quantity inputs
  document.querySelectorAll('select, input[type="number"]').forEach(element => {
    element.addEventListener('change', (event) => {
      const category = element.id.replace('Qty', '');
      handleItemChange(category);
    });
  });
  
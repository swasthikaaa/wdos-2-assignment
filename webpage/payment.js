// Function to process payment
function processPayment() {
    // Retrieving form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const country = document.getElementById('country').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
  
    // Showing validation
    if (!name || !email || !phone || !address || !city || !zip || !country || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Generating delivery date (3 days from today)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
  
    // Displaying a thank you message
    const messageDiv = document.getElementById('thankYouMessage');
    messageDiv.textContent = `Thank you for your purchase, ${name}! Your delivery will arrive on ${deliveryDate.toDateString()}.`;
  }
  
const images = document.querySelectorAll(".hero-img");
let currentIndex = 0;

function changeImage() {
  // Remove 'active' class from all images
  images.forEach((img) => img.classList.remove("active"));

  // Add 'active' class to the current image
  images[currentIndex].classList.add("active");

  // Update index for next image
  currentIndex = (currentIndex + 1) % images.length;
}

// Change image every 3 seconds
setInterval(changeImage, 2000);

// Initial display
changeImage();


const subheadingElement = document.getElementById("subheading");
const messages = [
  "Choose KK Computers for an unparalleled shopping experience.",
  "We offer the latest technology with quality.",
  "Affordable prices and customer satisfaction are our priority.",
];

let messageIndex = 0;
let charIndex = 0;
let currentMessage = "";
let typingSpeed = 100; // Adjust typing speed (in milliseconds)

function typeMessage() {
  if (charIndex < messages[messageIndex].length) {
    // Add next character to the subheading
    currentMessage += messages[messageIndex].charAt(charIndex);
    subheadingElement.textContent = currentMessage;
    charIndex++;
    setTimeout(typeMessage, typingSpeed);
  } else {
    // Wait a bit before deleting the message
    setTimeout(deleteMessage, 1500); // 1.5s pause before deleting
  }
}

function deleteMessage() {
  if (charIndex > 0) {
    currentMessage = currentMessage.slice(0, -1); // Remove one character
    subheadingElement.textContent = currentMessage;
    charIndex--;
    setTimeout(deleteMessage, typingSpeed / 2); // Faster deletion
  } else {
    // Move to the next message or loop back to the first one
    messageIndex = (messageIndex + 1) % messages.length;
    setTimeout(typeMessage, typingSpeed);
  }
}

// Start the typing effect
typeMessage();





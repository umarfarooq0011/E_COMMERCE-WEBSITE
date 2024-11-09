const subContactElement = document.querySelector("#subcontact");
const messages1 = [
  "Contact us today for any questions or concerns.",
  "Reach out anytime—we're here to help!",
  "Get in touch; we're always ready to assist.",
];

let messageIndex1 = 0;
let charIndex1 = 0;
let currentMessage1 = "";
let typingSpeed1 = 100; // Adjust typing speed (in millis

function messageType() {
  if (charIndex1 < messages1[messageIndex1].length) {
    // Add next character to the subheading
    currentMessage1 += messages1[messageIndex1].charAt(charIndex1);
    subContactElement.textContent = currentMessage1;
    charIndex1++;
    setTimeout(messageType, typingSpeed1);
  } else {
    // Wait a bit before deleting the message
    setTimeout(messageDelete, 1500); // 1.5s pause before deleting
  }
}

function messageDelete() {
  if (charIndex1 > 0) {
    // remove character one by one from end of text
    currentMessage1 = currentMessage1.slice(0, -1); // Remove one character
    subContactElement.textContent = currentMessage1;
    charIndex1--;
    setTimeout(messageDelete, typingSpeed1 / 2); // Faster deletion
  } else {
    // Move to the next message or loop back to the first one
    messageIndex1 = (messageIndex1 + 1) % messages1.length;
    setTimeout(messageType, typingSpeed1);
  }
}
messageType();

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

//Show Loading Spinner
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide Loading Spinner
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from the apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author fiel is blank and replace it with 'Unknown'
  if (!quote.author) {
    author.TextContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check the quote length to dertermine styling
  if (quote.text.legnth > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote and hide loader
  quoteText.textContent = quote.text;
  complete();
}
// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}
//to tweet a quote
function tweetQuote() {
  const twitterUrl = `
    https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();

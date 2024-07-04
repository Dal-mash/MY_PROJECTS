async function generateQuote() {
    try {
        const author = document.getElementById('author');
        const quoteText = document.getElementById('quote');
        
        if (!author || !quoteText) {
            console.error('Author or QuoteText element not found');
            return;
        }

        const raw = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
        const data = await raw.json();
        if (data.length > 0) {
            author.textContent = data[0].author;
            quoteText.textContent ='" '+ data[0].quote +' "';
        } else {
            quoteText.textContent = "No quotes found";
            author.textContent = "";
        }
    } catch (error) {
        const quoteText = document.getElementById('quoteText');
        if (quoteText) {
            quoteText.textContent = "Error occurred while fetching quotes";
        }
        const author = document.getElementById('author');
        if (author) {
            author.textContent = "";
        }
        console.error("fetching error", error);
    }
}
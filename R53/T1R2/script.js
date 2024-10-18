document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.coingecko.com/api/v3";
  const portfolioContainer = document.getElementById("portfolio");
  const addCryptoForm = document.getElementById("addCryptoForm");
  const cryptoIdInput = document.getElementById("cryptoId");
  let cryptocurrencies = []; // Array to store cryptocurrencies in the portfolio
  let autofillSuggestions = []; // Array to store autofill suggestions

  // Function to fetch cryptocurrency data from CoinGecko API by ID
  async function fetchCryptoData(id) {
    try {
      const response = await fetch(`${apiUrl}/coins/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${id}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Function to fetch all cryptocurrencies from CoinGecko API
  async function fetchAllCryptocurrencies() {
    try {
      const response = await fetch(`${apiUrl}/coins/list`);
      if (!response.ok) {
        throw new Error("Failed to fetch all cryptocurrencies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Function to render the portfolio
  async function renderPortfolio() {
    portfolioContainer.innerHTML = "";

    for (let crypto of cryptocurrencies) {
      const { id, quantity } = crypto;
      const cryptoData = await fetchCryptoData(id); // await the fetchCryptoData function

      if (cryptoData) {
        const { name, symbol, image, market_data } = cryptoData;
        const currentPriceUSD = market_data.current_price.usd;
        const valueUSD = quantity * currentPriceUSD;

        const portfolioItem = document.createElement("div");
        portfolioItem.classList.add("portfolio-item");
        portfolioItem.innerHTML = `
                    <div>
                        <img src="${image.small}" alt="${name}" width="50">
                        <span>${name} (${symbol.toUpperCase()})</span>
                    </div>
                    <div>
                        <span>Quantity: ${quantity}</span>
                        <br>
                        <span>Value: $${valueUSD.toFixed(2)}</span>
                    </div>
                `;

        portfolioContainer.appendChild(portfolioItem);
      }
    }
  }

  // Function to handle adding a cryptocurrency to the portfolio
  async function addCryptoToPortfolio(id, quantity) {
    if (quantity <= 0) {
      alert("Please enter a positive quantity");
      return;
    }

    const existingCrypto = cryptocurrencies.find((crypto) => crypto.id === id);
    if (existingCrypto) {
      alert("This cryptocurrency is already in your portfolio");
      return;
    }

    const cryptoData = await fetchCryptoData(id);

    if (cryptoData) {
      const newCrypto = {
        id: id,
        quantity: parseFloat(quantity),
      };

      cryptocurrencies.push(newCrypto);
      await renderPortfolio(); // await the renderPortfolio function
    }
  }

  // Function to render autofill suggestions
  function renderAutofillSuggestions() {
    const autofillContainer = document.getElementById("autofill-suggestions");
    autofillContainer.innerHTML = "";

    for (let suggestion of autofillSuggestions) {
      const suggestionElement = document.createElement("div");
      suggestionElement.classList.add("autofill-suggestion");
      suggestionElement.textContent =
        suggestion.name + " (" + suggestion.symbol + ")";
      suggestionElement.addEventListener("click", function () {
        cryptoIdInput.value = suggestion.id;
        autofillSuggestions = [];
        renderAutofillSuggestions();
      });

      autofillContainer.appendChild(suggestionElement);
    }
  }

  // Event listener for the add crypto form submission
  addCryptoForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const cryptoId = cryptoIdInput.value.trim().toLowerCase();
    const quantity = parseFloat(
      document.getElementById("quantity").value.trim()
    ); // use parseFloat instead of parseInt

    if (cryptoId && quantity) {
      await addCryptoToPortfolio(cryptoId, quantity);
      addCryptoForm.reset(); // Reset the form after adding crypto
    }
  });

  // Event listener for the crypto ID input field
  cryptoIdInput.addEventListener("input", async function () {
    const inputValue = cryptoIdInput.value.trim().toLowerCase();
    if (inputValue.length >= 2) {
      const allCryptocurrencies = await fetchAllCryptocurrencies();
      autofillSuggestions = allCryptocurrencies.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(inputValue) ||
          crypto.symbol.toLowerCase().includes(inputValue) ||
          crypto.id.toLowerCase().includes(inputValue)
      );
      renderAutofillSuggestions();
    } else {
      autofillSuggestions = [];
      renderAutofillSuggestions();
    }
  });

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addCryptoForm.submit();
    }
  });

  // Initial rendering of the portfolio
  renderPortfolio();

  // Fetch all cryptocurrencies for autofill suggestions
  fetchAllCryptocurrencies();
});

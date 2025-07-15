const axios = require('axios');

async function getRandomQuote() {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      return {
        quote: data[0].q,
        author: data[0].a
      };
    } else {
      throw new Error('No quote found');
    }
  } catch (error) {
    throw new Error('Error fetching quote');
  }
}

module.exports = { getRandomQuote }; 
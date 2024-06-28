const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate-ui', async (req, res) => {
    const { command } = req.body;  // Example command received from the frontend
    const API_KEY = process.env.OPENAI_API_KEY;  // Ensure your API key is loaded from environment variables
  
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo-instruct",
            prompt: "Generate rich UI elements end to end complete functional error proof code for the following task -"+command,  // Use the command from the frontend directly
            max_tokens: 3000,  // Adjust based on your needs
            temperature: 0.7  // Modify if different creativity is needed
          }, {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
            }
          });

        console.log("GPT API RESPONSE:", response.data);
        res.json({ uiComponentCode: response.data.choices[0].text });
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).send('Failed to generate UI component');
    }
});

module.exports = router;

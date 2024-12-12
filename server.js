const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const OPENAI_API_KEY = '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'; // Replace with your OpenAI API Key

// Endpoint to generate images using DALL-E
app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body; // Get the word/phrase from frontend
    try {
        // Call DALL-E API
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: prompt,
                n: 1,
                size: '512x512',
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const imageUrl = response.data.data[0].url; // Get the generated image URL
        res.json({ imageUrl }); // Send URL back to frontend
    } catch (error) {
        console.error('Error generating image:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

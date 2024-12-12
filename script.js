async function generateImages() {
    const wordInput = document.getElementById('word').value; // Get input value
    const statusDiv = document.getElementById('status'); // Display status
    const imagesDiv = document.getElementById('images'); // Display images

    statusDiv.innerHTML = 'Generating image...';

    try {
        const response = await fetch('http://localhost:5000/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: wordInput }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate image');
        }

        const { imageUrl } = await response.json(); // Get image URL from backend
        statusDiv.innerHTML = 'Image generated successfully!';

        // Create an image element and add it to the imagesDiv
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = wordInput;
        imagesDiv.innerHTML = ''; // Clear previous images
        imagesDiv.appendChild(img);
    } catch (error) {
        console.error('Error generating image:', error.message);
        statusDiv.innerHTML = 'Error generating image.';
    }
}

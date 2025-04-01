import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [inputText, setInputText] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const canvasRef = useRef(null);

  // Load the image count from localStorage on component mount
  useEffect(() => {
    const storedCount = localStorage.getItem('suiImageCount');
    if (storedCount) {
      setImageCount(parseInt(storedCount, 10));
    }
    generateDefaultImage();
  }, []);

  const incrementImageCount = () => {
    const newCount = imageCount + 1;
    setImageCount(newCount);
    localStorage.setItem('suiImageCount', newCount.toString());
  };

  const generateDefaultImage = async () => {
    try {
      // Create a canvas for rendering the text with Sui-inspired design
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions
      const width = 1200;
      const height = 800;
      canvas.width = width;
      canvas.height = height;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#030a1a');
      gradient.addColorStop(1, '#071332');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add some subtle background elements
      createBackgroundElements(ctx, width, height);

      // Unified font size for all text
      const fontSize = 80;
      ctx.font = `bold ${fontSize}px "DM Sans", sans-serif`;
      ctx.textAlign = 'center';

      // Add the text "Sui" at top
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('Sui', width / 2, height / 3 - 40);

      // Add "is for" on the second line
      ctx.fillText('is for', width / 2, height / 3 + 40);

      // Add the default text "everyone" (with lighter blue)
      const defaultText = "everyone";

      // Use a lighter blue for the main text instead of gradient and glow
      ctx.fillStyle = '#7cc5ff';
      ctx.fillText(defaultText, width / 2, height / 2 + 60);

      // Draw elliptical border around the text (like in the second image)
      const textWidth = ctx.measureText(defaultText).width;
      drawEllipticalBorder(ctx, width / 2, height / 2 + 40, textWidth / 1.7, 70);

      // Add subtle accent dots left and right of text like in the reference
      addAccentDots(ctx, width / 2, height / 2 + 60, textWidth);

      // Add a subtle Sui logo watermark
      ctx.font = '18px "DM Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillText('Powered by Sui', width / 2, height - 40);

      // Convert canvas to image URL
      const imageUrl = canvas.toDataURL('image/png');

      setGeneratedImage({
        url: imageUrl,
        text: defaultText
      });
    } catch (error) {
      console.error('Error generating default image:', error);
    }
  };

  const createBackgroundElements = (ctx, width, height) => {
    // Add subtle grid pattern
    ctx.strokeStyle = 'rgba(76, 154, 255, 0.05)';
    ctx.lineWidth = 1;

    // Horizontal lines
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Vertical lines
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Add some blurred circles for decoration
    const colors = ['rgba(76, 154, 255, 0.1)', 'rgba(140, 111, 255, 0.1)'];
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = 50 + Math.random() * 150;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors[i % colors.length];
      ctx.filter = 'blur(50px)';
      ctx.fill();
    }
    ctx.filter = 'none';
  };

  const drawEllipticalBorder = (ctx, centerX, centerY, radiusX, radiusY) => {
    // Save the current state
    ctx.save();

    // Draw multiple glowing elliptical borders like in the second reference image
    for (let i = 0; i < 3; i++) {
      const expandFactor = i * 10;
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        radiusX + expandFactor,
        radiusY + expandFactor,
        0,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `rgba(76, 154, 255, ${0.8 - i * 0.2})`;
      ctx.lineWidth = 4 - i;
      ctx.stroke();
    }

    // Restore the context
    ctx.restore();
  };

  const addAccentDots = (ctx, centerX, centerY, textWidth) => {
    // Small accent dots on left and right (seen in the first reference image)
    const spacing = 15;

    // Left side dots
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX - textWidth / 2 - spacing * (i + 1), centerY, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(76, 154, 255, ${0.7 - i * 0.2})`;
      ctx.fill();
    }

    // Right side dots
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX + textWidth / 2 + spacing * (i + 1), centerY, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(76, 154, 255, ${0.7 - i * 0.2})`;
      ctx.fill();
    }
  };

  const generateImage = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      // Create a canvas for rendering the text with Sui-inspired design
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions
      const width = 1200;
      const height = 800;
      canvas.width = width;
      canvas.height = height;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#030a1a');
      gradient.addColorStop(1, '#071332');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add some subtle background elements
      createBackgroundElements(ctx, width, height);

      // Unified font size for all text
      const fontSize = 80;
      ctx.font = `bold ${fontSize}px "DM Sans", sans-serif`;
      ctx.textAlign = 'center';

      // Add the text "Sui" at top
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('Sui', width / 2, height / 3 - 40);

      // Add "is for" on the second line
      ctx.fillText('is for', width / 2, height / 3 + 40);

      // Add the input text (with lighter blue)
      // Use a lighter blue for the main text instead of gradient and glow
      ctx.fillStyle = '#7cc5ff';
      ctx.fillText(inputText, width / 2, height / 2 + 60);

      // Draw elliptical border around the text (like in the second image)
      const textWidth = ctx.measureText(inputText).width;
      drawEllipticalBorder(ctx, width / 2, height / 2 + 40, textWidth / 1.7, 70);

      // Add subtle accent dots left and right of text like in the reference
      addAccentDots(ctx, width / 2, height / 2 + 60, textWidth);

      // Add a subtle Sui logo watermark
      ctx.font = '18px "DM Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillText('Powered by Sui', width / 2, height - 40);

      // Convert canvas to image URL
      const imageUrl = canvas.toDataURL('image/png');

      setGeneratedImage({
        url: imageUrl,
        text: inputText
      });

      // Increment the image count
      incrementImageCount();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = generatedImage.url;
    link.download = `sui-is-for-${generatedImage.text.toLowerCase().replace(/\s+/g, '-')}.png`;

    // Append to the document, trigger click, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareToX = () => {
    if (!generatedImage) return;

    const text = `Sui is for ${generatedImage.text}. Create your own at`;
    const url = window.location.href;
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    window.open(shareUrl, '_blank');
  };

  // Share to GitHub function
  const shareToGitHub = () => {
    if (!generatedImage) return;
    // Open GitHub profile or repo
    window.open('https://github.com/sui-foundation', '_blank');
  };

  // Share to Telegram function
  const shareToTelegram = () => {
    if (!generatedImage) return;

    const text = `Sui is for ${generatedImage.text}. Create your own!`;
    const url = window.location.href;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen px-4 py-4 md:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Sui</span> is for everyone
          </h1>
          <p className="text-lg md:text-xl" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Create customized blockchain-themed visuals to share
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sui-card mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter word or phrase"
              className="sui-input"
            />
            <button
              onClick={generateImage}
              disabled={isLoading}
              className="sui-button whitespace-nowrap"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </motion.div>

        {/* Output Section - Always show this section, either with default or generated image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sui-card"
        >
          <div className="generated-image-container mb-6">
            {generatedImage && (
              <img
                src={generatedImage.url}
                alt={`Sui is for ${generatedImage.text}`}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={handleDownload} className="sui-button download-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download
            </button>

            <button onClick={shareToX} className="sui-button download-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share to X
            </button>

            <button onClick={shareToGitHub} className="sui-button download-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>

            <button onClick={shareToTelegram} className="sui-button download-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm2.692 14.889c.161.12.36.181.558.181.219 0 .438-.068.625-.204l.006-.004c.349-.249.467-.676.284-1.061l-1.726-4.36 4.152-2.501c.365-.219.483-.626.281-1.014-.203-.388-.639-.55-1.031-.383l-9.993 4.997c-.396.198-.599.624-.464 1.052.134.427.553.693.988.627l3.066-.497 2.267 2.718c.191.229.469.348.746.348h.01z"></path>
              </svg>
              Telegram
            </button>
          </div>
        </motion.div>

        {/* Image Counter */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>{imageCount} {imageCount === 1 ? 'image' : 'images'} generated and counting</p>
        </div>
      </div>

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;
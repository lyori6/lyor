#!/bin/bash

# Script to help set up Vercel deployment

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
else
    echo "Vercel CLI is already installed."
fi

# Login to Vercel
echo "Logging in to Vercel..."
vercel login

# Link the project to Vercel
echo "Linking project to Vercel..."
vercel link

# Get project information
echo "Getting project information..."
vercel project ls

echo ""
echo "Setup complete! You can now push your changes to GitHub and Vercel will automatically deploy your site."
echo ""
echo "To set up a custom domain, go to your project in the Vercel dashboard:"
echo "1. Navigate to Settings > Domains"
echo "2. Add your custom domain (lyori.com)"
echo "3. Follow Vercel's instructions to configure your DNS settings"

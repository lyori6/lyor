#!/bin/bash
set -e

# Print debugging information
echo "Current directory: $(pwd)"
echo "Ruby version: $(ruby -v)"
echo "Bundler version: $(bundle -v || echo 'Bundler not installed')"

# If on Vercel, use the Vercel-specific Ruby version file
if [ -n "$VERCEL" ]; then
  echo "Running on Vercel, using .ruby-version-vercel"
  if [ -f ".ruby-version-vercel" ]; then
    cp .ruby-version-vercel .ruby-version
    echo "Updated .ruby-version for Vercel deployment"
  fi
fi

# Install Bundler if not already installed
if ! command -v bundle &> /dev/null; then
  echo "Installing Bundler..."
  gem install bundler
fi

# Configure Bundler
echo "Configuring Bundler..."
bundle config set --local path 'vendor/bundle'

# Install dependencies
echo "Installing dependencies..."
bundle install

# Build the site
echo "Building site..."
JEKYLL_ENV=production bundle exec jekyll build --trace

echo "Build completed successfully!"

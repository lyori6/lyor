# Lyor Itzhaki Portfolio Website

This is the source code for Lyor Itzhaki's personal portfolio website and blog, built with Jekyll.

## Deployment Instructions

### GitHub Pages Deployment

This site is configured to deploy automatically to GitHub Pages using GitHub Actions. When you push changes to the main branch, the site will be built and deployed automatically.

The site can be accessed at: https://lyori6.github.io/lyor/

### Vercel Deployment

This site is also configured to deploy to Vercel. The Vercel deployment will automatically detect changes and deploy the site.

The site can be accessed at: https://lyori.com

## Local Development

To run the site locally:

1. Install dependencies:
   ```
   bundle install
   ```

2. Build and serve the site:
   ```
   bundle exec jekyll serve
   ```

3. Access the site at http://localhost:4000/lyor/

## Project Structure

- `_layouts/`: Contains the HTML templates for the site
- `_posts/`: Contains blog post markdown files
- `assets/`: Contains CSS, JavaScript, and images
- `blog/`: Contains the blog index page
- `images/`: Contains images used throughout the site
- `_config.yml`: Configuration file for Jekyll

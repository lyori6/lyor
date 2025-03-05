# Lyor Itzhaki Portfolio Website

This is the source code for Lyor Itzhaki's personal portfolio website and blog, built with Jekyll.

## Deployment Instructions

### Vercel Deployment (Primary Method)

This site is configured to deploy to Vercel using direct GitHub integration. Vercel automatically deploys the site when changes are pushed to the main branch.

For detailed setup instructions, see [VERCEL_SETUP.md](VERCEL_SETUP.md).

The site can be accessed at your Vercel deployment URL (and eventually at https://lyori.com once the custom domain is configured).

### GitHub Actions

A GitHub Actions workflow is set up to build the Jekyll site and verify that it builds correctly. This workflow is defined in `.github/workflows/build-jekyll.yml`.

### GitHub Pages Deployment (Deprecated)

This site was previously configured to deploy to GitHub Pages. This method is now deprecated in favor of Vercel deployment.

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

3. Access the site at http://localhost:4000/

## Project Structure

- `_layouts/`: Contains the HTML templates for the site
- `_posts/`: Contains blog post markdown files
- `assets/`: Contains CSS, JavaScript, and images
- `blog/`: Contains the blog index page
- `images/`: Contains images used throughout the site
- `_config.yml`: Configuration file for Jekyll
- `vercel.json`: Configuration file for Vercel deployment

# Website Documentation

## Blog Integration Documentation

This directory contains comprehensive documentation for the blog integration implemented on the website.

### Available Documentation

1. [**Blog Integration Overview**](blog-integration.md)
   - High-level overview of the blog implementation
   - Directory structure and configuration changes
   - Features and sample content

2. [**Clean Blog Theme Technical Reference**](clean-blog-theme-reference.md)
   - Detailed technical specifications
   - Theme components and architecture
   - Integration details and customization options
   - Troubleshooting common technical issues

3. [**Blog Content Management Guide**](blog-content-guide.md)
   - Instructions for creating and managing blog posts
   - Markdown syntax reference
   - Content best practices and publishing workflow
   - Troubleshooting content-specific issues

4. [**Navigation and Articles Section Update**](navigation-articles-update.md)
   - Documentation of navigation menu simplification
   - Implementation details of the Articles section on the home page
   - CSS styling and responsive design considerations
   - Technical implementation and future enhancement options

## Using This Documentation

- **For Developers**: Start with the Technical Reference for implementation details
- **For Content Creators**: Refer to the Content Management Guide for day-to-day usage
- **For Project Overview**: See the Integration Overview for a high-level summary
- **For Troubleshooting**: Each document contains specific troubleshooting sections

## Local Development

To run the website locally:

1. Install dependencies:
   ```
   bundle install
   ```

2. Start the Jekyll server:
   ```
   bundle exec jekyll serve
   ```

3. View the site at `http://localhost:4000`

## Deployment

The website is deployed through GitHub Pages:

1. Push changes to the main branch
2. GitHub Pages automatically builds and deploys the site

## Key Files and Directories

- `_layouts/default.html` - Main layout template
- `_layouts/post.html` - Blog post template
- `_posts/` - Directory containing all blog posts
- `blog/index.html` - Blog index page
- `assets/css/blog.css` - Blog-specific styles
- `_config.yml` - Jekyll configuration with blog settings

## Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)

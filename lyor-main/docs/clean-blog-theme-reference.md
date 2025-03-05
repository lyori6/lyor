# Clean Blog Theme Technical Reference

## Introduction

This document provides technical details about the Clean Blog theme integration with the existing website. The implementation follows the principles of the Clean Blog Jekyll theme by Start Bootstrap, adapted to work seamlessly with the current site design.

## Theme Components

### Layout Structure

The Clean Blog theme implementation uses a modular layout structure:

```
_layouts/
├── default.html  # Main layout with header and footer
└── post.html     # Blog post layout
```

#### default.html

The `default.html` layout serves as the primary template for all pages. It includes:

- HTML5 doctype and responsive meta tags
- CSS and JavaScript includes
- Navigation header
- Main content area (yielded from child templates)
- Footer

#### post.html

The `post.html` layout extends `default.html` and adds blog post-specific elements:

- Post header with title and metadata
- Post content area
- Tags display
- Post navigation (previous/next)

### CSS Architecture

The blog styling follows a component-based approach:

```
assets/css/
└── blog.css     # Blog-specific styles
```

The CSS is organized into logical sections:

1. **Blog Container**: Overall layout and spacing
2. **Blog Header**: Title and description styling
3. **Blog Posts List**: Card-based layout for the index page
4. **Single Blog Post**: Typography and spacing for individual posts
5. **Post Navigation**: Previous/next post links
6. **Responsive Styles**: Media queries for different screen sizes

### Jekyll Configuration

The Jekyll configuration (`_config.yml`) includes several blog-specific settings:

```yaml
# Pagination
paginate: 6
paginate_path: "/blog/page:num/"

# Defaults for blog posts
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      permalink: /blog/:year/:month/:day/:title/
```

## Integration Details

### Navigation Integration

The blog is integrated into the main site navigation:

```yaml
navigation:
  # Other navigation items...
  - title: Blog
    url: "/blog/"
```

This ensures consistent navigation across the entire site.

### URL Structure

The blog uses a clean, SEO-friendly URL structure:

- Blog index: `/blog/`
- Pagination: `/blog/page2/`, `/blog/page3/`, etc.
- Individual posts: `/blog/2025/03/01/product-management-essentials/`

### Front Matter Schema

Blog posts use a standardized front matter schema:

```yaml
---
layout: post
title: "Post Title"
author: Author Name
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
description: SEO description
---
```

### Responsive Design Implementation

The blog is fully responsive with specific breakpoints:

- **Mobile**: Up to 767px
- **Tablet**: 768px to 991px
- **Desktop**: 992px and above

Media queries adjust typography, spacing, and layout at each breakpoint.

## Technical Considerations

### Performance Optimization

The blog implementation includes several performance optimizations:

1. **Minimal CSS**: Only essential styles are included
2. **Lazy Loading**: Images can be lazy-loaded for better performance
3. **Pagination**: Limits the number of posts loaded on each page

### SEO Considerations

SEO optimizations include:

1. **Semantic HTML**: Proper use of heading hierarchy and semantic elements
2. **Meta Tags**: Title, description, and Open Graph tags
3. **Sitemap**: Automatic sitemap generation via jekyll-sitemap
4. **Permalinks**: SEO-friendly URL structure

### Accessibility Features

The blog implementation follows accessibility best practices:

1. **Semantic Markup**: Proper use of HTML5 semantic elements
2. **Color Contrast**: Sufficient contrast between text and background
3. **Keyboard Navigation**: All interactive elements are keyboard accessible
4. **Screen Reader Support**: Appropriate ARIA attributes where needed

## Customization Guide

### Theme Colors

The primary colors used in the blog can be modified in `assets/css/blog.css`:

```css
/* Primary colors */
:root {
  --blog-primary: #0077cc;
  --blog-primary-dark: #005fa3;
  --blog-text: #333;
  --blog-text-light: #666;
  --blog-background: #fff;
  --blog-border: #eaeaea;
}
```

### Typography

The blog uses the same typography as the main site:

- Headings: Catamaran, Raleway
- Body text: Roboto

### Layout Customization

To modify the layout of blog posts or the index page:

1. Edit the corresponding template in `_layouts/`
2. Adjust the CSS in `assets/css/blog.css`

## Development Workflow

### Local Development

For local development:

1. Install dependencies: `bundle install`
2. Start Jekyll server: `bundle exec jekyll serve`
3. View at http://localhost:4000/blog/

### Testing

Before deployment, test:

1. **Responsive Design**: Check on multiple device sizes
2. **Cross-Browser Compatibility**: Test in Chrome, Firefox, Safari, and Edge
3. **Performance**: Use Lighthouse to assess performance
4. **Accessibility**: Use axe or similar tools to check accessibility

### Deployment

The blog is deployed as part of the main site through GitHub Pages:

1. Push changes to the main branch
2. GitHub Pages automatically builds and deploys the site

## Troubleshooting Common Issues

### Empty Layout Files

If the blog page doesn't load correctly, check that the layout files have content:

```bash
# Check file sizes
ls -la _layouts/

# If files are empty (0 bytes), recreate them with proper content
```

### CSS Not Loading

If blog styles are not applied:

1. Verify the path to blog.css in the default.html layout
2. Check that the conditional include is working correctly:
   ```liquid
   {% if page.layout == 'post' or page.url contains '/blog/' %}
   <link rel="stylesheet" href="/assets/css/blog.css">
   {% endif %}
   ```

### Jekyll Build Errors

Common Jekyll build errors and solutions:

1. **Liquid syntax errors**: Check for missing or mismatched curly braces in templates
2. **Front matter issues**: Ensure YAML front matter is properly formatted
3. **Plugin errors**: Verify all required gems are installed

## Appendix

### Dependencies

The blog implementation depends on:

- Jekyll 4.2.x
- jekyll-paginate 1.1.x
- jekyll-sitemap 1.4.x
- jekyll-feed 0.12.x
- jekyll-seo-tag 2.7.x

### Reference Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Clean Blog Theme](https://startbootstrap.com/theme/clean-blog-jekyll)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

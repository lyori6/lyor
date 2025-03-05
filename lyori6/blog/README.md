# Blog Integration with Clean Blog Theme

This directory contains the blog component of the website, integrated using the Clean Blog Jekyll theme principles.

## Directory Structure

- `_layouts/` - Contains layout templates for the blog
  - `post.html` - Template for individual blog posts
  - `default.html` - Main template that includes header and footer
- `_posts/` - Contains all blog post content files in Markdown format
- `blog/` - Contains the blog index page and pagination
- `assets/css/blog.css` - Custom CSS for the blog component

## Creating New Blog Posts

To create a new blog post:

1. Create a new Markdown file in the `_posts` directory with the filename format: `YYYY-MM-DD-title-of-post.md`
2. Add the following front matter at the top of the file:

```yaml
---
layout: post
title: "Your Post Title"
author: Your Name
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
description: A brief description of your post.
---
```

3. Write your post content in Markdown format below the front matter.

## Blog Image Feature

The blog now supports images in article cards. Here's how it works:

### Adding Images to Blog Posts

There are two ways to add images to your blog posts:

1. **Using the `image` front matter field (recommended)**:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   author: Your Name
   date: YYYY-MM-DD
   tags: [tag1, tag2]
   description: Your post description.
   image: /path/to/your/image.jpg
   ---
   ```

2. **Using images within the post content**:
   If no `image` field is specified in the front matter, the system will automatically use the first image found in the post content.

3. **Fallback to placeholder**:
   If no image is found in either the front matter or the post content, a placeholder image will be displayed.

### Image Display

Images are displayed in article cards on:
- The blog index page (`/blog/index.html`)
- The homepage articles section (`/index.html`)

### Responsive Design

The image display is fully responsive and will adapt to different screen sizes. The CSS includes:
- Proper image sizing and cropping
- Hover effects
- Responsive grid layouts for different screen sizes

### Placeholder Image

A placeholder SVG image is provided at `/assets/images/blog-placeholder.svg` for posts without images.

## Local Development

To test the blog locally:

1. Make sure you have Ruby and Bundler installed
2. Run `bundle install` to install dependencies
3. Run `bundle exec jekyll serve` to start the local server
4. Visit `http://localhost:4000/blog/` to see your blog

## Customization

- To modify the blog appearance, edit the `assets/css/blog.css` file
- To change the blog layout, edit the templates in the `_layouts` directory
- To adjust pagination or other settings, modify the `_config.yml` file

## Deployment

The blog will be automatically deployed along with the rest of the website when changes are pushed to the main branch.

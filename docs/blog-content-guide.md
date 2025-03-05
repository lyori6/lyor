# Blog Content Management Guide

## Introduction

This guide provides instructions for creating, editing, and managing blog content on your website. It's designed for content creators who need to publish and maintain blog posts.

## Creating Blog Posts

### Basic Post Creation

To create a new blog post:

1. Navigate to the `_posts` directory in your project
2. Create a new file with the naming convention: `YYYY-MM-DD-title-of-post.md`
   - Example: `2025-03-15-how-to-improve-user-retention.md`
3. Add the required front matter at the top of the file:

```yaml
---
layout: post
title: "Your Post Title"
author: Your Name
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
description: A brief description of your post (important for SEO).
---
```

4. Write your post content below the front matter using Markdown syntax

### Markdown Basics

Your blog posts are written in Markdown. Here are the basics:

#### Headers

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

#### Text Formatting

```markdown
*Italic text*
**Bold text**
~~Strikethrough text~~
```

#### Lists

Unordered list:
```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
```

Ordered list:
```markdown
1. First item
2. Second item
3. Third item
```

#### Links

```markdown
[Link text](https://example.com)
```

#### Images

```markdown
![Alt text](path/to/image.jpg)
```

For images in your blog, place them in the `/images/blog/` directory and reference them like this:

```markdown
![Product Management Framework](/images/blog/product-framework.jpg)
```

#### Blockquotes

```markdown
> This is a blockquote
```

#### Code Blocks

```markdown
`inline code`

```javascript
// Code block with syntax highlighting
function example() {
  return 'Hello World';
}
```
```

## Advanced Content Features

### Adding Tags

Tags help categorize your content and improve discoverability:

```yaml
tags: [product management, startups, growth, user experience]
```

Keep tags consistent across posts to build meaningful categories.

### Featured Images

To add a featured image that appears at the top of your post and in previews:

```yaml
---
layout: post
title: "Your Post Title"
featured_image: /images/blog/featured-image.jpg
---
```

### Excerpts

The first paragraph of your post will automatically be used as an excerpt on the blog index page. To specify a custom excerpt:

```yaml
---
layout: post
title: "Your Post Title"
excerpt: "This is a custom excerpt that will appear in the blog index."
---
```

### Table of Contents

For longer posts, you can include an automatic table of contents:

```yaml
---
layout: post
title: "Your Post Title"
toc: true
---
```

## Content Best Practices

### SEO Optimization

1. **Descriptive Titles**: Use clear, keyword-rich titles (under 60 characters)
2. **Meta Descriptions**: Write compelling descriptions (120-160 characters)
3. **URL Structure**: The URL will be created from your filename, so use descriptive filenames
4. **Headings**: Use proper heading hierarchy (H2, H3, etc.)
5. **Image Alt Text**: Always include descriptive alt text for images

### Writing Guidelines

1. **Voice and Tone**: Maintain a professional but conversational tone
2. **Paragraph Length**: Keep paragraphs short (3-4 sentences maximum)
3. **Sentence Structure**: Vary sentence length for better readability
4. **Active Voice**: Use active rather than passive voice
5. **Scannable Content**: Use headers, lists, and formatting to make content scannable

### Content Structure

For optimal engagement, structure your posts with:

1. **Compelling Introduction**: Hook readers in the first paragraph
2. **Clear Sections**: Use headings to organize content logically
3. **Visual Elements**: Include relevant images, diagrams, or charts
4. **Actionable Conclusion**: End with key takeaways or a call to action

## Publishing Workflow

### Draft Posts

To create a draft post that won't be published yet:

```yaml
---
layout: post
title: "Draft Post Title"
date: 2025-03-15
draft: true
---
```

Drafts won't appear on the live site.

### Scheduling Posts

Posts are automatically published based on the date in the front matter. To schedule a post for future publication, simply set a future date.

### Updating Published Posts

To update a published post:

1. Edit the markdown file in the `_posts` directory
2. Commit and push your changes
3. The site will automatically rebuild with your updates

### Removing Posts

To remove a post:

1. Delete the file from the `_posts` directory, or
2. Set `published: false` in the front matter:

```yaml
---
layout: post
title: "Post to Hide"
published: false
---
```

## Troubleshooting Content Issues

### Post Not Appearing

If your post doesn't appear on the blog:

1. **Check the date**: Posts with future dates won't appear unless you set `future: true` in _config.yml
2. **Verify front matter**: Ensure your YAML front matter is properly formatted with no syntax errors
3. **Check file naming**: Confirm the file follows the `YYYY-MM-DD-title.md` format
4. **Rebuild the site**: Sometimes a full rebuild is needed with `bundle exec jekyll clean && bundle exec jekyll serve`

### Formatting Problems

If your Markdown isn't rendering correctly:

1. **Spacing issues**: Ensure there's a blank line before and after lists and code blocks
2. **Special characters**: Escape special characters with backslashes when needed
3. **Indentation**: Maintain consistent indentation in lists and code blocks

### Image Display Issues

If images aren't displaying:

1. **Path verification**: Double-check the path to your images
2. **Case sensitivity**: Ensure the case in your image path matches the actual file
3. **File existence**: Confirm the image file has been added to the repository

## Content Management Tips

### Editorial Calendar

Maintain a consistent publishing schedule using an editorial calendar:

1. Plan posts at least 1 month in advance
2. Aim for 2-4 posts per month
3. Balance topics across your areas of expertise

### Content Repurposing

Maximize the value of your content by repurposing it:

1. Turn a series of related posts into an ebook
2. Create social media snippets from key points
3. Develop infographics from data-heavy posts

### Content Maintenance

Regularly review and update existing content:

1. Update statistics and references
2. Refresh outdated information
3. Improve SEO for underperforming posts
4. Add internal links to newer related content

## Getting Help

If you encounter issues:

1. Check the [Jekyll documentation](https://jekyllrb.com/docs/)
2. Review the error messages in the build logs
3. Consult the troubleshooting sections in the technical reference document

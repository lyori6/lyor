# Vercel Deployment Setup

This document outlines how to deploy this Jekyll site to Vercel.

## Prerequisites

- A GitHub account with this repository
- A Vercel account (can sign up with GitHub)

## Deployment Steps

1. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/) and sign in with GitHub
   - Click "Add New..." and select "Project"
   - Select this repository from the list

2. **Configure Project**:
   - Framework Preset: Other
   - Build Command: `bundle install && bundle exec jekyll build`
   - Output Directory: `_site`
   - Install Command: Leave blank (handled by build command)

3. **Environment Variables**:
   - No additional environment variables are required for basic setup

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your site

## Troubleshooting

If you encounter build errors:

1. **Ruby Version Issues**:
   - Vercel uses Ruby 3.2.2 by default, which is specified in our `.ruby-version` file
   - The Gemfile is configured to work with this version

2. **Jekyll Build Errors**:
   - Check the build logs for specific error messages
   - Most common issues are related to gem dependencies, which are handled in our Gemfile

3. **Custom Domain Setup**:
   - In Vercel dashboard, go to your project settings
   - Navigate to "Domains"
   - Add your custom domain and follow the verification steps

## Local Testing

To test the same build process locally:

```bash
bundle install
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## File Configuration

Key files for Vercel deployment:

- `vercel.json` - Configures Vercel-specific settings
- `Gemfile` - Specifies Ruby dependencies
- `.ruby-version` - Specifies Ruby version
- `package.json` - Defines build commands and Node.js version

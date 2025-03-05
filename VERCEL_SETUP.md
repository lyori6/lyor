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
   - Build Command: `chmod +x ./build.sh && ./build.sh`
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
   - The project is configured to work with Ruby 3.2.0 (Vercel's default) or 3.2.2 (local development)
   - The build script automatically handles the version differences between environments

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
./build.sh
```

The built site will be in the `_site` directory.

## File Configuration

Key files for Vercel deployment:

- `vercel.json` - Configures Vercel-specific settings
- `build.sh` - Custom build script that handles environment differences
- `Gemfile` - Specifies Ruby dependencies with version flexibility
- `.ruby-version` - Specifies Ruby version for local development
- `.ruby-version-vercel` - Specifies Ruby version for Vercel deployment

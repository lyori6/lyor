# Setting Up Vercel Deployment with GitHub Integration

This guide will walk you through setting up Vercel deployment for your Jekyll site using direct GitHub integration.

## Step 1: Connect GitHub Repository to Vercel

1. Create a Vercel account at https://vercel.com if you don't have one already
2. Go to the Vercel dashboard and click "Add New..." > "Project"
3. Select "Import Git Repository" and choose your GitHub repository
4. Authenticate with GitHub if prompted
5. Configure your project settings:
   - Framework Preset: Other
   - Build Command: `bundle install && bundle exec jekyll build`
   - Output Directory: `_site`
   - Install Command: Leave as default or set to `bundle install`
6. Click "Deploy"

## Step 2: Configure Environment Variables (if needed)

1. In the Vercel dashboard, go to your project
2. Navigate to Settings > Environment Variables
3. Add any necessary environment variables:
   - `JEKYLL_ENV`: `production`

## Step 3: Set Up Automatic Deployments

Vercel automatically sets up GitHub webhooks to trigger deployments when you push to your repository. Each push to the main branch will trigger a new deployment.

You can also set up preview deployments for pull requests:

1. In the Vercel dashboard, go to your project
2. Navigate to Settings > Git
3. Ensure "Deploy Preview" is enabled for pull requests

## Step 4: Set Up Custom Domain

1. In the Vercel dashboard, go to your project
2. Navigate to Settings > Domains
3. Add your custom domain (lyori.com)
4. Follow Vercel's instructions to configure your DNS settings

## Verifying Your Setup

1. Make a small change to your repository and push it to GitHub
2. Go to the Vercel dashboard to see the deployment in progress
3. Once completed, your site will be available at your Vercel URL

## Troubleshooting

- If deployments fail, check the build logs in the Vercel dashboard
- Ensure your `vercel.json` file is correctly configured
- Verify that your Jekyll site builds correctly locally with `bundle exec jekyll build`

#!/bin/sh
# Copies the public files into _site, which Vercel serves. There is no compile step.
set -e
rm -rf _site
mkdir -p _site
cp -R index.html home.css home.js case-study.css robots.txt sitemap.xml images assets blog _site/
echo "Built _site"

#!/usr/bin/env sh

# abort on errors
set -e

# update article date
node article-date-updater
git add src/assets/articles/articles.json
git commit -m "update article date"

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f --set-upstream https://github.com/oneyedev/oneyedev.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
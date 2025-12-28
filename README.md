# js-webpack-template
A template repository for quick webpack config setup

## Setup Instructions

Clone and cd into the template repo, then install all dependencies:
```bash
git clone git@github.com:arshjameel/js-webpack-template.git
cd js-webpack-template
npm install
```

Start development server:
```bash
npm run dev
```

Access the dev environment at: [http://localhost:8080](http://localhost:8080)

## Deployment Instructions

Push changes to remote repository's main branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Create a separate branch to deploy built files (first time only):
```bash
git branch gh-pages
```

Deploy changes:
```bash
npm run deploy
```
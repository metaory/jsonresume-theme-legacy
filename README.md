JSONRESUME-THEME-LEGACY
=======================

Legacy handlebars port to Vite

<div align="center">
  <img src="https://raw.githubusercontent.com/metaory/jsonresume-theme-legacy/master/screenshot.png" width="200px">
</div>

---

USAGE
=====

```sh
# clone
git clone git@github.com:metaory/jsonresume-theme-legacy.git

# navigate
cd jsonresume-theme-legacy

# install dependencies
pnpm install

# run development
pnpm run dev

# open sample page
http://localhost:5173

# duplicate the resume data
cp src/pages/index.json src/pages/private.json

# update the resume data
nvim src/pages/private.json

# open newly created page
http://localhost:5173/private

# build production
pnpm run deploy
```

---

License
-------
[MIT](LICENSE)

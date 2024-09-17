JSONRESUME-THEME-LEGACY
=======================

Legacy handlebars port to Vite

<div align="center">
  <img src="https://raw.githubusercontent.com/metaory/jsonresume-theme-legacy/master/screenshot.png">
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

# view sample page
http://localhost:5173

# build sample pdf
pnpm run build:sample

# duplicate the resume data
cp src/pages/index.json src/pages/private.json

# update the resume data
nvim src/pages/private.json

# view newly created page
http://localhost:5173/private

# build private pdf
pnpm run build:private
```

---

> [!Tip]
> You need the dev script running before running the pdf build script

---

> [!Warning]
> sh: line 1: chromium: command not found
>
> [chromium](https://chromium.org) is used for pdf exports
>
> If you use the proprietary `google-chrome`
> you have to update the [build:private](https://github.com/metaory/jsonresume-theme-legacy/blob/master/package.json) script accordingly

---

> [!Note]
> Only tested on Linux
>
> Reconsider your life choices if you're running Windows

---

License
-------
[MIT](LICENSE)

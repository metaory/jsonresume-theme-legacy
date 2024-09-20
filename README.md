<div align="center">
  <img height="200" src="https://raw.githubusercontent.com/metaory/jsonresume-theme-legacy/master/src/assets/logo.svg">
  <h5>JSONRESUME-THEME-LEGACY</h5>
  <h4>
    <a href="https://metaory.github.io/jsonresume-theme-legacy">
      metaory.github.io/jsonresume-theme-legacy
    </a>
  </h4>
</div>

---

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

Customization
-------------

Icons
-----

[Iconify](https://icon-sets.iconify.design) is used for icons.

The default icon map is defined in [src/pages/index.json](https://github.com/metaory/jsonresume-theme-legacy/blob/master/src/pages/index.json)

Under `meta.themeOptions.iconMap`

You can add/overwrite by adding the desired key value in your `private.json`

You can use icons from any collection;

For example to add new icon for keyword `system-design` to have `mingcute:ghost-line` icon, and to
overwrite the `javascript` icon

```jsonc
{
  // ...
  "meta": {
    "themeOptions": {
      "iconMap": {
        "system-design": "mingcute:ghost-line",
        "javascript": "fluent:code-js-rectangle-16-filled"
      }
      // ...
    }
  }
}
```

> [!Note]
> Make sure the keys in `iconMap` are all lowercase
>
> While the keyword do NOT have to be lowercase

> [!Tip]
> the iconify icon name can be in either form
>
> - `hugeicons:ai-view`
> - `hugeicons--ai-view`

> [!Tip]
> a complete process restart is needed if overwriting existing icons

---

Colors
------

You can overwrite color values

Under `meta.themeOptions.colors`

- [ ] TODO

---

Titles
------

You can section titles

Under `meta.themeOptions.sectionTitles`

---

Troubleshooting
---------------

> [!Tip]
> You need the dev script running before running the pdf build script

---

> [!Warning]
> `sh: line 1: chromium: command not found`
>
> [chromium](https://chromium.org) is used for pdf exports
>
> If you use the proprietary `google-chrome`
> you have to update the [build:private](https://github.com/metaory/jsonresume-theme-legacy/blob/master/package.json) script accordingly

---

> [!Note]
> Only tested on Linux
>
> Reconsider your life choices if you're running Windows 💩

---

License
-------
[MIT](LICENSE)

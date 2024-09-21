<div align="center">
  <img height="200" src="https://raw.githubusercontent.com/metaory/jsonresume-theme-legacy/master/src/assets/logo.svg">
  <h3>JSONRESUME-THEME-LEGACY</h3>
  <h4><a href="https://metaory.github.io/jsonresume-theme-legacy">LIVE DEMO</a></h4>
</div>

---

<div align="center">
  <h4>SAMPLE</h4>
  <a href="sample.pdf">view</a> / <a href="sample.pdf">download<a>
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

> [!Note]
> [Iconify](https://icon-sets.iconify.design) is used for icons.

> [!Note]
> The default icon map is defined in [src/pages/index.json](https://github.com/metaory/jsonresume-theme-legacy/blob/master/src/pages/index.json)
> Under `meta.themeOptions.iconMap`

> [!Tip]
> You can add/overwrite by adding the desired key value in your `private.json`

> [!Tip]
> You can use icons from any collection

For example to add new icon
for keyword `system-design` to have `mingcute:ghost-line` icon,
and to overwrite the `javascript` icon;

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

> [!Important]
> Make sure the keys in `iconMap` are all lowercase
>
> While the keyword do NOT have to be lowercase

> [!Tip]
> the iconify icon name can be in either form
>
> - `hugeicons:ai-view`
> - `hugeicons--ai-view`

> [!Caution]
> a complete process restart is needed if overwriting existing icons

---

Images
------

> [!Tip]
> Image paths can be remote or local
>
> Local path is from root

```jsonc
{
  "basics": {
    "name": "John Doe",
    "label": "Programmer",
    // remote images
    "image": "https://avatars.githubusercontent.com/u/9919",
    // local private ignored assets
    "logo": "/.dev/my-private-logo.png",
    // ...
  },
  // ...
}
```

---

Colors
------

> [!Tip]
> ~~You can overwrite color values~~
>
> ~~Under `meta.themeOptions.colors`~~
>
> 🚧 Not implemented

---

Titles
------

> [!Tip]
> You can change section titles
>
> Under `meta.themeOptions.sectionTitles`

---

Troubleshooting
---------------

> [!Caution]
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
> Reconsider your life choices if you're running  💩 Windows!

---

License
-------
[MIT](LICENSE)

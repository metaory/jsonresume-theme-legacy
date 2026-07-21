import vituum from "vituum";
import handlebars from "@vituum/vite-plugin-handlebars";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync, writeFileSync } from "node:fs";

const readJson = (path) => JSON.parse(readFileSync(path, { encoding: "utf8" }));

const getHueValue = (pageData) =>
  pageData?.meta?.themeOptions?.["theme-hue"] ?? 0;
const getSatValue = (pageData) =>
  pageData?.meta?.themeOptions?.["theme-sat"] ?? 2;

// Load default icons and section titles
const DEFAULT_ICONS = readJson("./src/data/icons.json");

// TW4 scans source for class names; ICO helper builds them at render time
writeFileSync(
  "./src/styles/icons.safelist",
  Object.values(DEFAULT_ICONS)
    .map((x) => `icon-[${x.replace(":", "--")}]`)
    .join("\n"),
);

const DEFAULT_TITLES = {
  basics: "contacts",
  interests: "interests",
  skills: "skills",
  languages: "languages",
  overview: "overview",
  work: "work experience",
  projects: "projects",
  volunteer: "volunteers",
  education: "education",
  awards: "awards",
  certificates: "certificates",
  publications: "publications",
  references: "references",
};

const getIcon = (x, pageData) => {
  const customIcons = pageData?.meta?.themeOptions?.iconMap || {};
  const allIcons = { ...DEFAULT_ICONS, ...customIcons };
  const iconName = allIcons[x.toLowerCase().replaceAll(" ", "-")];
  return iconName ? `icon-[${iconName}]`.replace(":", "--") : "";
};

const getTitle = (
  x,
  { meta: { themeOptions: { sections = {}, sectionTitles = {} } = {} } = {} },
) =>
  sections[x] && typeof sections[x] === "string"
    ? sections[x]
    : { ...DEFAULT_TITLES, ...sectionTitles }[x] || x;

const mkDateFormatter = (opt) => (str) =>
  Date.parse(str)
    ? new Intl.DateTimeFormat("en-US", opt).format(new Date(str))
    : str;

export default {
  plugins: [
    vituum(),
    handlebars({
      root: "./src",
      helpers: {
        Y: mkDateFormatter({ year: "numeric" }),
        MY: mkDateFormatter({ year: "numeric", month: "short" }),
        DMY: mkDateFormatter({
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        ICO: (x, { data }) => getIcon(x, data.root),
        TITLE: (x, { data }) => getTitle(x, data.root),
        HUE: (_, { data }) => getHueValue(data.root),
        SAT: (_, { data }) => getSatValue(data.root),
        URL: (url) =>
          url
            .replace(/http(s)?:\/\//, "")
            .replace("github.com/", "") // TODO: handle for others
            .replace("metaory.github.io/", "") // TODO: handle for others
            .replace(/\/$/, ""),
        URL_ICO: (url, { data }) => {
          const [, domain] = url.match(/https:..(\w+).\w+/);
          return getIcon(domain, data.root);
        },
        isArray: (value) => Array.isArray(value),
      },
    }),
    tailwindcss(),
  ],
};

// ,,,

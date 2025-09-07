import vituum from 'vituum'
import handlebars from '@vituum/vite-plugin-handlebars'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'
import { readFileSync } from 'node:fs'

const readJson = path => JSON.parse(readFileSync(path, { encoding: 'utf8' }))

const getHueValue = pageData => pageData?.meta?.themeOptions?.['theme-hue'] ?? 0
const getSatValue = pageData => pageData?.meta?.themeOptions?.['theme-sat'] ?? 2

// Load default icons and section titles
const DEFAULT_ICONS = readJson('./src/data/icons.json')

const DEFAULT_TITLES = {
  "basics": "contacts",
  "interests": "interests",
  "skills": "skills",
  "languages": "languages",
  "overview": "overview",
  "work": "work experience",
  "projects": "projects",
  "volunteer": "volunteers",
  "education": "education",
  "awards": "awards",
  "certificates": "certificates",
  "publications": "publications",
  "references": "references"
}

const getIcon = (x, pageData) => {
  const customIcons = pageData?.meta?.themeOptions?.iconMap || {}
  const allIcons = { ...DEFAULT_ICONS, ...customIcons }
  const iconName = allIcons[x.toLowerCase().replaceAll(' ', '-')]
  return iconName ? `icon-[${iconName}]`.replace(':', '--') : ''
}

const getTitle = (x,
  { meta: {
    themeOptions: { sections = {}, sectionTitles = {} } = {}
  } = {} }) =>
  sections[x] && typeof sections[x] === 'string'
    ? sections[x]
    : { ...DEFAULT_TITLES, ...sectionTitles }[x] || x

const mkDateFormatter = opt => str =>
  Date.parse(str) ? new Intl.DateTimeFormat('en-US', opt).format(new Date(str)) : str

export default {
  plugins: [
    vituum(),
    handlebars({
      root: './src',
      helpers: {
        Y: mkDateFormatter({ year: 'numeric' }),
        MY: mkDateFormatter({ year: 'numeric', month: 'short' }),
        DMY: mkDateFormatter({ year: 'numeric', month: 'short', day: 'numeric' }),
        ICO: (x, { data }) => getIcon(x, data.root),
        TITLE: (x, { data }) => getTitle(x, data.root),
        HUE: (_, { data }) => getHueValue(data.root),
        SAT: (_, { data }) => getSatValue(data.root),
        URL: url => url.split('/').at(-1),
        URL_SEMI: url => url.split('https://').at(-1),
        URL_GIST: url => url.split('gist.github.com/metaory/').at(-1),
        URL_ICO: (url, { data }) => {
          const [, domain] = url.match(/https:..(\w+).\w+/)
          return getIcon(domain, data.root)
        },
      },
    }),
    tailwindcss({
      tailwindcss: {
        content: ['./src/components/*.hbs'],
        theme: { extend: {} },
        safelist: Object.values(DEFAULT_ICONS).map(x => `icon-[${x.replace(':', '--')}]`),
        plugins: [addDynamicIconSelectors()],
      },
    }),
  ],
}

// ,,,

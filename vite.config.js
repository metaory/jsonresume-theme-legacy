import vituum from 'vituum'
import handlebars from '@vituum/vite-plugin-handlebars'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'
import { readFileSync, readdirSync } from 'node:fs'

const readJson = path => JSON.parse(readFileSync(path, { encoding: 'utf8' }))

const { ICONS, TITLES } = readdirSync('./src/pages').reduce(
  (acc, page) => {
    const themeOptions = readJson(`./src/pages/${page}`)?.meta?.themeOptions
    const { iconMap, sectionTitles } = themeOptions || {}
    return {
      ICONS: { ...acc.ICONS, ...iconMap },
      TITLES: { ...acc.TITLES, ...sectionTitles },
    }
  },
  {
    ICONS: {
      // dark: 'mage:moon-fill',
      // light: 'mage:sun-fill',
      dark: 'line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition',
      light: 'line-md:moon-filled-alt-to-sunny-filled-loop-transition',
    },
    TITLES: {},
  }
)

const getIcon = x => `icon-[${ICONS[x.toLowerCase()] || ICONS.na}]`.replace(':', '--')
const getTitle = x => TITLES[x] || x

const mkDateFormatter = opt => str => new Intl.DateTimeFormat('en-US', opt).format(new Date(str))

export default {
  plugins: [
    vituum(),
    handlebars({
      root: './src',
      helpers: {
        Y: mkDateFormatter({ year: 'numeric' }),
        MY: mkDateFormatter({ year: 'numeric', month: 'short' }),
        DMY: mkDateFormatter({ year: 'numeric', month: 'short', day: 'numeric' }),
        ICO: getIcon,
        TITLE: getTitle,
        URL: url => url.split('/').at(-1),
      },
    }),
    tailwindcss({
      tailwindcss: {
        content: ['./src/components/*.hbs'],
        theme: { extend: {} },
        safelist: Object.keys(ICONS).map(getIcon),
        plugins: [addDynamicIconSelectors()],
      },
    }),
  ],
}

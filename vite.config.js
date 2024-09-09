import vituum from 'vituum'
import handlebars from '@vituum/vite-plugin-handlebars'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'

const LANGS = {
  simpleicons: {
    bash: 'simple-icons--gnubash',
    elixir: 'simple-icons--elixir',
    go: 'simple-icons--go',
    haskell: 'simple-icons--haskell',
    javascript: 'simple-icons--javascript',
    lua: 'simple-icons--lua',
    python: 'simple-icons--python',
    rust: 'simple-icons--rust',
    zig: 'simple-icons--zig',
  },
  catppuccin: {
    bash: 'catppuccin--bash',
    elixir: 'catppuccin--elixir',
    go: 'catppuccin--go',
    haskell: 'catppuccin--haskell',
    javascript: 'catppuccin--javascript',
    lua: 'catppuccin--lua',
    python: 'catppuccin--python',
    rust: 'catppuccin--rust',
    zig: 'catppuccin--zig',
  },
  skillicons: {
    bash: 'skill-icons--bash-dark',
    elixir: 'skill-icons--elixir-dark',
    go: 'skill-icons--golang',
    haskell: 'skill-icons--haskell-dark',
    javascript: 'skill-icons--javascript',
    lua: 'skill-icons--lua-dark',
    python: 'skill-icons--python-dark',
    rust: 'skill-icons--rust',
    zig: 'skill-icons--zig-dark',
  },
}

const ICONS = {
  // ...LANGS.catppuccin,
  // ...LANGS.skillicons,
  ...LANGS.simpleicons,

  lua: 'nonicons:lua-16',
  javascript: 'fluent:javascript-24-regular',
  go: 'tabler:brand-golang',
  rust: 'tabler:brand-rust',
  python: 'gravity-ui:logo-python',
  'backbone.js': 'tabler:brand-backbone',
  'build pipelines': 'hugeicons:pipeline',
  'ci/cd': 'carbon:continuous-integration',
  'data-masking': 'mingcute:face-mask-line',
  'data-mining': 'hugeicons:mining-02',
  'electron.js': 'eos-icons:atom-electron',
  'etl pipelines': 'carbon:data-unreal',
  'express.js': 'simple-icons:express',
  'natural language processing (nlp)': 'flowbite:language-outline',
  'payment gateways': 'carbon:gateway-api',
  'security scans': 'iconamoon:scanner',
  'vulnerability remediation': 'hugeicons:danger',
  ai: 'hugeicons:ai-brain-04',
  api: 'hugeicons:api',
  arm: 'simple-icons:arm',
  article: 'solar:document-text-linear',
  automation: 'icon-park-outline:flashlamp',
  aws: 'tabler:brand-aws',
  backup: 'mingcute:package-2-line',
  challenge: 'material-symbols:labs',
  cli: 'gravity-ui:terminal',
  code: 'solar:code-square-linear',
  colorscheme: 'mingcute--palette-line',
  config: 'mage:file-2',
  copy: 'gravity-ui--copy',
  cordova: 'simple-icons:apachecordova',
  db: 'iconoir:db',
  devops: 'fluent:cloud-cube-16-regular',
  devsecops: 'uil:cloud-lock',
  dictionary: 'streamline:dictionary-language-book-solid',
  digitalocean: 'simple-icons:digitalocean',
  docker: 'gravity-ui:logo-docker',
  education: 'basil:university-outline',
  emoji: 'mingcute:emoji-line',
  ffmpeg: 'file-icons:ffmpeg',
  filter: 'mingcute:filter-line',
  font: 'mingcute--font-line',
  game: 'solar:gameboy-linear',
  git: 'tabler:brand-git',
  github: 'ph:github-logo-bold',
  githubactions: 'simple-icons:githubactions',
  gitops: 'ri:git-pr-draft-line',
  glyph: 'material-symbols:glyphs-rounded',
  heroku: 'simple-icons:heroku',
  html: 'hugeicons:html-5',
  image: 'mage:image',
  integrations: 'carbon:integration',
  iot: 'ph:graph',
  issueops: 'pajamas:bug',
  json: 'tabler--json',
  kubernetes: 'bxl:kubernetes',
  lambda: 'tabler:file-lambda',
  launcher: 'heroicons:rocket-launch',
  library: 'solar:library-linear',
  link: 'gravity-ui:link',
  linkedin: 'mage:linkedin',
  linux: 'gravity-ui:logo-linux',
  location: 'hugeicons--location-05',
  magic: 'solar:magic-stick-3-linear',
  mail: 'basil:gmail-solid',
  markdown: 'mingcute:markdown-line',
  markup: 'gravity-ui:code',
  messaging: 'mingcute:chat-1-line',
  mongodb: 'tabler:brand-mongodb',
  mqtt: 'mdi:mq',
  na: 'gravity-ui--circle-exclamation-fill',
  neovim: 'skill-icons--neovim-dark',
  nodejs: 'tabler:brand-nodejs',
  npm: 'hugeicons:npm',
  oidc: 'hugeicons:access',
  opensource: 'tabler:brand-open-source',
  pandas: 'icon-park-outline:panda',
  patching: 'fluent:patch-24-regular',
  performance: 'solar:graph-up-linear',
  phone: 'flowbite:phone-solid',
  promise: 'logos:promises',
  proxy: 'mingcute:route-line',
  queues: 'hugeicons:keyframes-multiple',
  random: 'gravity-ui:dice-2',
  react: 'hugeicons:react',
  redis: 'fontisto:redis',
  reference: 'hugeicons:thumbs-up-rectangle',
  search: 'mingcute:search-3-line',
  skills: 'hugeicons--alien-02',
  slack: 'ri:slack-line',
  ssh: 'mdi:ssh',
  ssr: 'tabler:server-2',
  summary: 'hugeicons--summation-square',
  svelte: 'tabler:brand-svelte',
  svg: 'tabler:svg',
  task: 'solar:checklist-minimalistic-linear',
  templating: 'tabler:template',
  terraform: 'tabler:brand-terraform',
  tmux: 'fluent:layout-row-two-split-bottom-24-regular',
  transpiler: 'tabler:transform',
  unicode: 'basil:university-outline',
  vanilla: 'icon-park-outline:icecream-three',
  vue: 'mingcute:vue-line',
  watch: 'solar:eye-linear',
  webcomponent: 'ion:logo-web-component',
  websocket: 'solar:socket-linear',
  wm: 'fluent:panel-left-header-16-regular',
  work: 'hugeicons:office',
}

const ALIASES = {
  'shell scripting': ICONS.bash,
  'linux administration': ICONS.linux,
  serverless: ICONS.lambda,
  cloudformation: ICONS.templating,
  dynamodb: ICONS.db,
  rds: ICONS.db,
  interest: ICONS.game,
  backups: ICONS.backup,
}

const getIcon = x => {
  const k = x.toLowerCase()
  return ICONS[k] || ALIASES[k] || ICONS.na
}
const getIconName = x => `icon-[${getIcon(x)}]`.replace(':', '--')

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
        ICO: getIconName,
        URL: url => url.split('/').at(-1),
      },
    }),
    tailwindcss({
      tailwindcss: {
        content: ['./src/**/*.hbs'],
        theme: { extend: {} },
        safelist: Object.keys(ICONS).map(getIconName),
        plugins: [addDynamicIconSelectors()],
      },
    }),
  ],
}

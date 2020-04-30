/* istanbul ignore file */

const sirvCli = require('sirv-cli/boot')

export { sirvCli }

export { 
  hmrBuild, getAriaConfig,
  parseConfig, getPackage, 
  parsePlugins, clean, 
  buildES, TSRollupConfig,
  PluginOptions
} from 'aria-build'
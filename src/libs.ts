/* istanbul ignore file */

const sirvCli = require('sirv-cli/boot')
const hmrPlugin = require('rollup-plugin-hot')

export { sirvCli, hmrPlugin }

export { 
  getAriaConfig,
  parseConfig, getPackage, 
  parsePlugins, clean, 
  buildES, TSRollupConfig,
  PluginOptions,
  watch,
  rollupBuild,
  CreateRollupConfigOptions, 
  _createTSRollupConfig,
  RollupConfigBase,
  ConfigResult
} from 'aria-build'
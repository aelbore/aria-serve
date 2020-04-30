import { join } from 'path'

import { ServeCommandLineOptions } from './options'
import { PluginOptions, TSRollupConfig, buildES } from './libs'

export interface BuildESOptions {
  name: string
  options: ServeCommandLineOptions,
  plugins: PluginOptions
}

export function createConfig(opts: BuildESOptions) {
  const { options, plugins, name  } = opts
  
  const esConfig = buildES({ 
    pkgName: name, 
    ...options, 
    format: 'es', 
    output: options.dir, 
    plugins 
  })
  
  const configOptions: TSRollupConfig = {
    ...esConfig,
    output: {
      ...esConfig.output,
      file: join(options.dir, 'bundle.js')
    },
    hmr: options.hmr
  }

  return configOptions
}
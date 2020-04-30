import { join } from 'path'

import { 
  hmrBuild, getAriaConfig, 
  parseConfig, getPackage, 
  parsePlugins, clean, 
  sirvCli
} from './libs'

import { ServeCommandLineOptions } from './options'
import { createConfig } from './build-es'

export async function handler(options: ServeCommandLineOptions) {
  const { entry, config, port, dir } = options

  const [ ariaConfig, pkgJson ] = await Promise.all([
    getAriaConfig(parseConfig({ config, entry })),
    getPackage(),
    clean(options.clean ?? join(dir, 'bundle.js@hot'))
  ])

  const name = pkgJson.name
  const plugins = parsePlugins(ariaConfig.plugins)
  const configOptions = createConfig({ name, options, plugins })
  
  await Promise.all([ 
    sirvCli(dir, { 
      dev: 'dev', 
      single: true,
      port 
    }),
    hmrBuild({ config: configOptions, name })  
  ])
}
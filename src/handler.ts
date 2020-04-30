import { 
  hmrBuild, getAriaConfig, parseConfig, getPackage, parsePlugins, clean, buildES, sirvCli
} from './libs'

import { ServeCommandLineOptions } from './options'

export async function handler(options: ServeCommandLineOptions) {
  const { entry, config, port, dir } = options

  const [ ariaConfig, pkgJson ] = await Promise.all([
    getAriaConfig(parseConfig({ config, entry })),
    getPackage()
  ])

  const pkgName = pkgJson.name
  const plugins = parsePlugins(ariaConfig?.plugins)

  options.clean 
    && await clean(options.clean)

  const configOptions = buildES({ pkgName, ...options, plugins })

  await Promise.all([ 
    sirvCli(dir, { 
      dev: 'dev', 
      single: true,
      port 
    }),
    hmrBuild({ 
      config: configOptions,
      name: pkgName 
    })  
  ])
}
import { 
  hmrPlugin, 
  watch as rollupWatch, 
  rollupBuild,
  CreateRollupConfigOptions, _createTSRollupConfig, RollupConfigBase 
} from './libs'

export async function hmrBuild(options: CreateRollupConfigOptions) {
  const config = options.config as RollupConfigBase

  const { inputOptions, outputOptions } = _createTSRollupConfig(options)
  await rollupBuild({ inputOptions, outputOptions })
  
  const { input, plugins, watch } = inputOptions
  const { sourcemap, file, format } = outputOptions

  config.hmr &&
    rollupWatch({
      input,
      plugins: [
        ...(plugins as any[]),
        hmrPlugin({
          public: 'public',
          clearConsole: false,
          write: true
        })
      ],
      watch,
      output: {
        sourcemap,
        file,
        format
      }
    })
}
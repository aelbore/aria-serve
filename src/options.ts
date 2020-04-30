/* istanbul ignore file */

const DEFAULT_DIR = 'public'

export interface ServeCommandLineOptions {
  entry?: string
	external?: string
	clean?: string
	sourcemap?: boolean | 'inline' | 'hidden'
	config?: string
  resolve?: boolean | string
  target?: string
  hmr?: boolean
  port?: number
  dir?: string
}

export const getCliOptions = () => ({
  package: 'aria-serve',
  command: 'serve',
  options: [
    { alias: '-i, --entry', description: 'Entry modules' },
    { alias: '-p, --port', description: 'Port to bind (default 3000)', defaultValue: 3000 },
    { alias: '-c, --config', description: 'config file of aria-build. i.e aria.config.ts' },
    { alias: '-d, --dir', description: 'Public directory (default: public)', defaultValue: DEFAULT_DIR  },
    { alias: '--hmr', description: 'Enable the hot module reload', defaultValue: false },
    { alias: '--external', description: 'Specify external dependencies' },
    { alias: '--sourcemap', description: 'Generate sourcemap', defaultValue: true },
    { alias: '--resolve', description: 'Resolve dependencies' },
    { alias: '--target', description: 'Target framework or library to build (i.e react or vue)' },
    { alias: '--clean', description: 'Clean the public folder' }        
  ]
})
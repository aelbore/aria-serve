import * as mockfs from 'mock-fs'
import * as sinon from 'sinon'

import { PackageFile, AriaConfigOptions } from 'aria-build'
import { expect } from 'aria-mocha'

import { handler } from './handler'
import { ServeCommandLineOptions } from './options'

describe('handler', () => {
  let libs: typeof import('./libs')
  let hmrBuild: typeof import('./hmr-build')

  function createStubs() {
    const parsePluginsStub = sinon.spy(libs, 'parsePlugins')
    const fsCleanStub = sinon.stub(libs, 'clean').returns(void 0)

    const parseConfigStub = sinon.spy(libs, 'parseConfig')

    const pkg: PackageFile = {
      name: 'aria-test',
      dependencies: {
        'vue': '2.0.1'
      }
    }
    const getPackage = sinon
      .stub(libs, 'getPackage')
      .returns(Promise.resolve(pkg))

    const sirvCliStub = sinon.stub(libs, 'sirvCli').returns(void 0)
    const hmrBuildStub = sinon.stub(hmrBuild, 'hmrBuild').returns(void 0)

    return {
      parsePluginsStub,
      fsCleanStub,
      parseConfigStub,
      getPackage,
      sirvCliStub,
      hmrBuildStub
    }
  }

  before(async () => {
    [ hmrBuild, libs ] = await Promise.all([ import('./hmr-build'), import('./libs') ])
  })

  afterEach(() => {
    mockfs.restore()
    sinon.restore()
  })

  it('should build with handler with default options', async() => {
    const options: ServeCommandLineOptions = {
      port: 3000,
      dir: 'public',
      sourcemap: true,
      hmr: false
    }

    const config: AriaConfigOptions = { 
      output: {
        globals: {}
      }
    }
    const getAriaConfigStub = sinon
      .stub(libs, 'getAriaConfig')
      .returns(Promise.resolve(config))

    const {
      parsePluginsStub,
      fsCleanStub,
      parseConfigStub,
      getPackage,
      sirvCliStub,
      hmrBuildStub
    } = createStubs()

    await handler(options)

    expect(parsePluginsStub.called).toBeTrue()
    expect(fsCleanStub.called).toBeTrue()
    expect(parseConfigStub.called).toBeTrue()
    expect(getPackage.called).toBeTrue()
    expect(sirvCliStub.called).toBeTrue()
    expect(hmrBuildStub.called).toBeTrue()
    expect(getAriaConfigStub.called).toBeTrue()
  })

  it('should build with handler with custom options', async() => {
    const options: ServeCommandLineOptions = {
      port: 3000,
      dir: 'public',
      sourcemap: false,
      hmr: false,
      clean: 'dist'
    }

    const config: AriaConfigOptions = { 
      output: {
        globals: {}
      }
    }
    const getAriaConfigStub = sinon
      .stub(libs, 'getAriaConfig')
      .returns(Promise.resolve(config))

    const {
      parsePluginsStub,
      fsCleanStub,
      parseConfigStub,
      getPackage,
      sirvCliStub,
      hmrBuildStub
    } = createStubs()

    await handler(options)
    
    expect(parsePluginsStub.called).toBeTrue()
    expect(fsCleanStub.called).toBeTrue()
    expect(parseConfigStub.called).toBeTrue()
    expect(getPackage.called).toBeTrue()
    expect(sirvCliStub.called).toBeTrue()
    expect(hmrBuildStub.called).toBeTrue()
    expect(getAriaConfigStub.called).toBeTrue()
  })

})
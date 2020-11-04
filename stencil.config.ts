import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [{
    type: 'www',
    serviceWorker: null,
    copy: [
      {
        src: 'services/workers',
        dest: 'workers'
      }
    ]
  }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  rollupPlugins: {
    after: [
      nodePolyfills(),
    ]
  }
}

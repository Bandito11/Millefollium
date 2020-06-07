import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [{
    type: 'www'
  }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  copy: [
    {
      src: 'services/workers',
      dest: 'workers'
    }
  ],
  rollupPlugins: {
    after: [
      nodePolyfills(),
    ]
  }
}

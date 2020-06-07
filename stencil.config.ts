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
    },
    {
      src: '../node_modules/lokijs/build/lokijs.min.js',
      dest: 'lokijs.min.js'
    }
  ],
  plugins: [
    nodePolyfills(),
  ]
};

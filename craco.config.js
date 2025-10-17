const CracoSwcPlugin = require('craco-swc');
const path = require('path');
const fs = require('fs');

const { whenDev } = require('@craco/craco');

module.exports = {
  plugins: [
    {
      plugin: CracoSwcPlugin,
      options: {
        swcLoaderOptions: {
          jsc: {
            externalHelpers: true,
            target: 'es5',
            parser: {
              syntax: 'ecmascript',
              jsx: true,
              dynamicImport: true,
              exportDefaultFrom: true,
            },
          },
        },
      },
    },
  ],
  devServer: whenDev(() => ({
    https: true
  })),
};
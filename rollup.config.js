// import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import clear from 'rollup-plugin-clear'

export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/sdc-monitor.esm.js',
      format: 'es'
    },
    {
      file: './dist/sdc-monitor.umd.js',
      format: 'umd',
      name: 'SdcMonitor'
    },
    {
      file: './dist/sdc-monitor.umd.min.js',
      format: 'umd',
      name: 'SdcMonitor',
      plugins: [terser()]
    }
  ],
  plugins: [
    babel({ 
      babelHelpers: 'bundled',
      exclude: ['/node_modules/']
    }),
    clear({
      targets: ['dist']
    })
  ]
}
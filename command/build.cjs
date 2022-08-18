const path = require('path')
const fs = require('fs')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fse = require('fs-extra')

// 入口文件夹
const entryDir = path.resolve(__dirname, '../packages')
// 出口文件夹
const outDir = path.resolve(__dirname, '../lib')

// vite 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
})

// rollup 配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
}

// 全量打包
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd'],
      },
      outDir,
    },
  })
  createIndexDTs()
  createRootPackageJson()
}

// 生成 package.json 文件
const createRootPackageJson = () => {
  const fileStr = `{
  "name": "xlh-element-plus-components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "module": "index.umd.cjs",
  "types": "index.d.ts",
  "keywords": [
    "element-plus",
    "ts",
    "组件封装",
    "二次封装"
  ],
  "author": "xiaolonghao",
  "license": "ISC"
}
`
  // 输出
  fse.outputFile(path.resolve(outDir, 'package.json'), fileStr, 'utf-8')
}

// 单组件打包
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd'],
      },
      outDir: path.resolve(outDir, name),
    },
  })
}

// 每个组件生成单独的 package.json 文件
const createPackageJson = (name) => {
  const fileStr = `{
  "name": "${name}",
  "main": "index.js",
  "module": "index.umd.cjs",
  "style": "styles.css"
}
`
  // 输出
  fse.outputFile(path.resolve(outDir, `${name}/package.json`), fileStr, 'utf-8')
}

// 生成 index.d.ts 文件
const createIndexDTs = (name) => {
  const fileStr = `
import { App } from 'vue'

declare const _default: {
  install(app: App): void
}

export default _default
`

  // 输出
  fse.outputFile(
    path.resolve(outDir, name ? `${name}/index.d.ts` : 'index.d.ts'),
    fileStr,
    'utf-8'
  )
}

const buildLib = async () => {
  await buildAll()

  // 获取组件名称
  const components = fs.readdirSync(entryDir).filter((name) => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return (
      isDir &&
      name !== 'utils' &&
      fs.readdirSync(componentDir).includes('index.ts')
    )
  })

  // 循环构建
  for (const name of components) {
    await buildSingle(name)
    createPackageJson(name)
    createIndexDTs(name)
  }
}

buildLib()

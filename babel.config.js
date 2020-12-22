module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    //为ant-design-vue配置babel-plugin-import
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        //默认即可
        styleLibraryName: 'theme-chalk',
      },
    ],
    //jsx语法配置
    [
      '@vue/babel-plugin-jsx',
      {
        optimize: true,
      },
    ],
  ],
};

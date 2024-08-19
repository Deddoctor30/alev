module.exports = {
    // optimizeFonts: false,

    // Для Dockera раскомитить ниже, собрает файлы в одну папку
    output: 'standalone',
    typescript: {
        ignoreBuildErrors: true,
      },
    // compiler: {
    //     removeConsole: true,
    //   },

    // 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Врубил флаг, т.е. без него некст не делает билд
    outputFileTracing: false
}
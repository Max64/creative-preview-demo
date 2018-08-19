module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3030',
                pathRewrite: {'^/api': ''}
            }
        }
    }
}

const path = require('path')

function resolve(dir){
    return path.join(__dirname, './', dir)
}
module.exports = {    
    configureWebpack: {
	    resolve: {
	    	// 扩展名自动补全
	    	extensions: ['.js', '.vue', '.scss', '.json']
	    },
	    plugins: [
	    ]
	},
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve("src"))
            .set('COMPONENTS', resolve('src/components'))
            .set('SCSS', resolve("src/assets/scss"))
            .set('IMGS', resolve("src/assets/images"))
    }
    // devServer:{
    //     proxy:{
    //         "/api":{
    //             target:'https://c.y.qq.com/',
    //             secure:false,
    //             pathRewrite:{
    //                 "^/api":""
    //             },
    //             changeOrigin:true,
    //             logLevel:"debug"
    //         }
    //     }
    // }
}
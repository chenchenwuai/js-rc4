//单入口文件
//webapck4.x之后，配置文件path必须为绝对路径
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports={
    // mode:"production",
    //入口文件
    //entry可以有三种写法--字符串/数组/对象
    //字符串：entry:'路径'
    //数组：entry:['路径1'，'路径1']
    //对象：entry: {
    // main:'./src/index.js',
    // main2:'./src/index2.js'
    //}
    entry:{
        rc4:'./src/index.js',
    },
    //打包之后文件的位置
    output:{
        path:path.resolve(__dirname,'../dist'),
        //name代表文件名，hash代表打包时随机生成的hash值，可当作版本号,chunkhash随机版本号，修改过后的文件的hash值发生变化
        filename:'[name].js',
        libraryTarget:'umd', //打包可直接script引入的js文件
        library:'RC4', // 引入文件的抛出全局变量
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: "babel-loader"
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(), // 清空项目根目录下dist
    ]
}
module.exports = {
    // 直接把admin生成的dist文件夹放到server下的admin
    outputDir : __dirname + '/../server/admin',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/' 
    : '/'
}
# 进入脚本目录，更新npm版本号
cd './scripts/npm-publish/'
if [ $0=='patch' ]
then
    npm version patch
elif [ $0=='major' ]
then
    npm version major
else
    npm version minor
fi
# 将package.json拷贝到构建好的脚本目录，然后发布
cp './package.json' '../../build/npm'
cd '../../build/npm'
npm publish
cd -
# git add .
# git commit -m 'build: 发布 npm 版本'
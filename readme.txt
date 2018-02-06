首先先安装node.js 
npm install 初始化
src 开发目录
dist生成目录
bin 生产目录

gulp default 开发模式 localhost:8080 可以调试开发
gulp build 生产模式
其他辅助命令暂时不列举
涉及到项目内容已删除





开发说明：
 gulp checkjs 检查自己写的js是否正确
 gulp devless 检查并生成自己写的开发版本样式
 gulp buildless 检查并生成自己写的样式


src 目录说明：
 assets 第三方 静态文件
 font 第三方字体
 html  主要页面 
 js 脚本文件
 less 样式
 statichtml 静态html页面（弹出对话框页面）

 js脚本说明：
   每个目录都必须有一个导出目录名字的js，例如 users目录下必须有users.js
	(作用：同html交互，若不需要交互写空文件即可）
  less 样式说明：
  common 公共变量
  core 核心样式
  mixin 混合样式
  pages 页面样式
  theme 主题样式
  index.less 样式入口





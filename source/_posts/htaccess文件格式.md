---
title: htaccess文件格式
date: 2024-11-29 21:54:39
tags: ['开发','Linux','前端','网络']
---

## htaccess文件简介
htaccess文件是Apache服务器中的一个配置文件，负责相关目录下的网页配置
/www/html下的.htaccess文件与主配置文件中段中内容完全等效
.htaccess文件中的配置指令作用于.htaccess文件所在的目录及其所有子目录
且子目录中的指令会覆盖父目录或者主配置文件中的指令

## rewrite的语法格式：
1. RewriteEngine On #启用rewrite起作用。
2. RewriteBase url-path #设定基准目录。
3. RewriteCond test-string condPattern #用于测试rewrite的匹配条件。
4. RewriteRule Pattern Substitution #规则

### RewriteEngine On|Off
RewriteEngine 用于开启或停用rewrite功能。rewrite configurations 不会自动继承

### RewriteBase URL-path
RewriteBase用于设定重写的基准URL
RewriteRule可以用于目录级的配置文件中 (.htaccess)并在局部范围内起作用
即规则实际处理的只是剥离了本地路径前缀的一部分
处理结束后，这个路径会被自动地附着回去
默认值是”RewriteBase physical-directory-path”

### RewriteCond TestString CondPattern [flags]
RewriteCond指令定义了一个规则的条件，即，在一个RewriteRule指令之前有一个或多个RewriteCond指令
条件之后的重写规则仅在当前URI与pattern匹配并且符合这些条件的时候才会起作用
TestString是一个纯文本的字符串
但是还可以包含下列可扩展的成分:
```htaccess
+RewriteRule反向引用: 引用方法是 $N (0 <= N <= 9) 引用当前(带有若干RewriteCond指令的)RewriteRule中的与pattern匹配的分组成分(圆括号!)
+RewriteCond反向引用: 引用方法是 %N (1 <= N <= 9) 引用当前若干RewriteCond条件中最后符合的条件中的分组成分(圆括号!)
+RewriteMap 扩展: 引用方法是 ${mapname:key|default} + 服务器变量: 引用方法是 %{ NAME_OF_VARIABLE } CondPattern是条件参数
Flags标识是是第三个参数,可选OR、AND、NC，默认为AND
```

### RewriteRule Pattern Substitution [Flags]
其中的Pattern就是参数，一般为一些文件的扩展名
Substitution是用来替换前面用的，这儿的Flags
常用的R表示 redirect（强制重定向），F表示forbidden（禁止访问），L表示last（最后）
通常当你希望停止重写操作而立即重定向时，可用它


## .htaccess文件URL重写写法例子

### 1. 反盗链
```htaccess
RewriteBase /
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^http://(www.)?yoursite.com/.*$ [NC]
RewriteRule .(gif|jpg|swf|flv|png)$ /feed/ [R=302,L]
```

### 2. 防止目录浏览
```htaccess
Options All -Indexes
```

### 3. SEO友好的301永久重定向
```htaccess
Redirect 301 http://www.yoursite.com/article.html http://www.yoursite.com/archives/article
```

### 4. 显示个性化的 404 错误页面
```htaccess
ErrorDocument 404 /404.html
```

### 5. 设置目录的默认页面
假如你需要为不同的目录设置不同的默认页面，你可以很容易的通过 .htaccess 实现：
```htaccess
DirectoryIndex about.html
```

### 6. 基于referer来限制网站访问
```htaccess
<IfModule mod_rewrite.c>
RewriteEngine on  RewriteCond %{HTTP_REFERER} spamteam.com [NC,OR]
RewriteCond %{HTTP_REFERER} trollteam.com [NC,OR]
RewriteRule .* – [F]
</ifModule>
```

### 7. 限制PHP上传文件大小
```htaccess
php_value upload_max_filesize 20M
php_value post_max_size 20M
php_value max_execution_time 200
php_value max_input_time 200
```

### 8. 通过压缩文件来减少网络流量
```htaccess
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
```

### 9. 缓存文件
```htaccess
<FilesMatch “.(flv|gif|jpg|jpeg|png|ico|swf|js|css|pdf)$”>
Header set Cache-Control “max-age=2592000〃
</FilesMatch>
```

### 10. 添加尾部的反斜杠
```htaccess
<IfModule mod_rewrite.c>
RewriteCond %{REQUEST_URI} /+[^\.]+$
RewriteRule ^(.+[^/])$ %{REQUEST_URI}/ [R=301,L]
</IfModule>
```

### 11. 处理移动过的文件
```htaccess
Redirect 301 /old.html http://yoursite.com/new.html
```

或者是
```htaccess
RewriteRule /old.html http://yoursite.com/new.html [R=301,L]
```

如果想隐式跳转
```htaccess
RewriteRule /old.html http://yoursite.com/new.html [L]
```

### 12. html后缀的url链接到php文件
```htaccess
RewriteRule ^/?([a-z/]+)\.html$ $1.php [L]
```

### 13. 旧文件夹的内容链接到新文件夹
```htaccess
RewriteRule ^/?old_directory/([a-z/.]+)$ new_directory/$1 [R=301,L]
```

### 14. 隐藏文件名
```htaccess
RewriteRule ^/?([a-z]+)$ $1.php [L]
```

### 15. 阻止/允许特定IP/IP段
禁止所有IP，除了指定的
```htaccess
order deny,allow
deny from all
```

如果想允许IP段，如123.123.123.0 ~ 123.123.123.255，则
```htaccess
allow from 123.123.123.
allow from 123.123.123.123

ErrorDocument 403 /page.html

<Files page.html>
allow from all
</Files>
```

如果想禁止特定IP
```htaccess
deny from 123.123.123.123
```

### 16. 添加MIME类型
```htaccess
AddType video/x-flv .flv
```

如果设置类型为 application/octet-stream 将提示下载
```htaccess
AddType application/octet-stream .pdf
```
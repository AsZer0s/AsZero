---
title: Pandora-Box使用教程
date: 2024-11-02 20:53:28
tags: ['软件','隐私']
---

# 1、[Pandora-Box](https://github.com/snakem982/Pandora-Box) 是什么？
* 一个简易的 Mihomo 桌面客户端，可以进行网络代理
* 爬取功能可以管理大量订阅节点，支持对节点的协议类型和国家地区筛选，支持将爬取的节点导出
* Windows 最新版本 [windows-amd64.zip ](https://github.com/snakem982/Pandora-Box/releases/download/v0.2.20/windows-amd64.zip)
* Mac intel 处理器最新版本 [darwin-amd64.zip](https://github.com/snakem982/Pandora-Box/releases/download/v0.2.20/darwin-amd64.zip)
* Mac M 处理器最新版本 [darwin-arm64.zip](https://github.com/snakem982/Pandora-Box/releases/download/v0.2.20/darwin-arm64.zip)

# 2、本文重点介绍其爬取的使用，其他的自行探索
*Pandora-Box：下文简称pb*

### 2.1、爬取原理是什么？
没看源码，个人猜测
pb会根据你输入的url地址，发起网络请求
对请求的内容进行解析，然后收集整理出各个类型的节点
再进一步去重后使用 Mihomo 进行节点可用性的检测

### 2.2、爬取之前为什么需要准备个可以富强的订阅？
因为你爬取的内容可能需要富强，比如github。

### 2.3、爬取之前为什么需要退出其他代理软件？
为了不影响节点可用性的检测

# 3、具体操作步骤
## 3.1、在配置中导入预先准备的订阅，然后选中
如果没有可自购或者在GitHub搜索节点抓取

## 3.2、在抓取中导入要抓取的URL地址
### 3.2.1 爬取源
[Github 免费节点 ](https://github.com/search?q=vless&type=repositories&s=updated&o=desc)

### 3.2.2 下面以这个库举例
[telegram-configs-collector](https://github.com/soroushmirzaei/telegram-configs-collector)
进入主页就可以看到订阅了

### 3.2.3 复制订阅地址，一一将其导入抓取页面里
抓取类型选择fuzzy模糊抓取，导入完毕点击抓取，等待5分钟

## 3.3、抓取完成进入筛选页面
就是点击右上角那个小漏斗图标
然后你可以根据你喜欢的协议类型、国家地区进行筛选了

## 3.4、节点的使用
### 3.4.1 导出使用
点击 **导出配置**，就会在浏览器中下载可用的节点配置
文件名为 Pandora-Box-Share.yaml
这样你就可以导入到你喜欢的代理工具中了

### 3.4.2 生成新配置
点击 **生成新配置**，就会在配置页面到一个以Filter开头的配置文件，可以选中使用

## 3.5、如何获取大量高质量节点

* 多使用搜索，导入多一些的爬取地址，量变引起质变
* 靠某些tg群组分享

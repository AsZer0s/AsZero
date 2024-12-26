---
title: 国内npm源镜像
tags:
  - 开发
  - 网络
abbrlink: 6842c86a
date: 2024-11-16 19:00:00
---

> 国内npm源镜像（npm加速下载） 指定npm镜像

## 国内npm源镜像
### 指定npm镜像

| NPM镜像提供方 | NPM镜像地址                                      |
|:-------------:|-------------------------------------------------|
|    NPM官方    | https://registry.npmjs.org/                     |
|      淘宝     | https://registry.npm.taobao.org/                |
|     阿里云    | https://npm.aliyun.com/                         |
|     腾讯云    | https://mirrors.cloud.tencent.com/npm/          |
|     华为云    | https://mirrors.huaweicloud.com/repository/npm/ |
|      网易     | https://mirrors.163.com/npm/                    |
|   中科院大学  | http://mirrors.ustc.edu.cn/                     |
|    清华大学   | https://mirrors.tuna.tsinghua.edu.cn/           |

### 切换源
```bash
npm config set registry 源的地址
```

### 查看当前的镜像源
```bash
npm config get registry
```

推荐使用上面的方式指定npm镜像，当然方法不唯一，也可以用 `nrm` 去指定npm镜像

## 什么是`nrm`
`nrm` 是一个 `npm 源管理器`，允许你快速地在 `npm` 源间切换

## 安装nrm
```bash
npm install -g nrm1
```

## 使用
### 查看可选的源
```bash
nrm ls   
1
```

### 切换
如果要切换到taobao源，执行命令
```bash
nrm use taobao1
```

## 测试速度
```bash
nrm test
```

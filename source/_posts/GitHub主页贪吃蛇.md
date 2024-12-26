---
title: GitHub主页贪吃蛇
tags:
  - 开发
  - 杂谈
abbrlink: 57bae214
date: 2024-11-20 22:10:05
---

## 前言
起因看到大佬github上有一条贪吃蛇扭来扭去
觉得好玩，遂给大家分享一下我的玩蛇历程

访问地址
[AsZer0s GitHub](https://github.com/AsZer0s)

## 步骤
1. 设置GitHub主页
   - 新建一个与你 `GitHub用户名` 同名的仓库
      比如我的 `GitHub UserName` 是 `AsZer0s`
      就需要创建一个名为 `AsZer0s` 的仓库
      > https://github.com/AsZer0s/AsZer0s
   - 创建 Actions
   - 创建 Workflow
         点击 `New workflow`
         新建 `你喜欢的名字.yml`
         输入如下内容
         ```yaml
         name: generate animation
         on:
            schedule:
                 - cron: "0 */24 * * *" 
            workflow_dispatch:
            push:
                 branches:
                 - main
         jobs:
         generate:
             runs-on: ubuntu-latest
             timeout-minutes: 10
             steps:
                 - name: generate github-contribution-grid-snake.svg
                   uses: Platane/snk/svg-only@v3
                   with:
                     github_user_name: ${{ github.repository_owner }}
                     outputs: |
                         dist/github-contribution-grid-snake.svg
                         dist/github-contribution-grid-snake-dark.svg?palette=github-dark
                   env:
                     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            
                 - name: push github-contribution-grid-snake.svg to the output branch
                   uses: crazy-max/ghaction-github-pages@v3.1.0
                   with:
                     target_branch: output
                     build_dir: dist
                   env:
                     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
         ```
      点击 `Commit changes...`
    - 运行 `Workflow`
    - 生成 `output` 分支
    - 查看 `生成svg外链地址`
         进入 `output` 分支
         点击生成的 `svg` 文件
         查看 `svg` 文件链接地址
         复制 `svg` 文件链接地址
    - 放在仓库的README.md
         将上一步复制的svg地址
         放置到README.md中
         可以是markdown格式

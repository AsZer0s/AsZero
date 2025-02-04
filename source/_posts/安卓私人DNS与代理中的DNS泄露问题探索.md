---
title: 安卓私人DNS与代理中的DNS泄露问题探索
tags: 
  - 网络
  - 隐私
abbrlink: 8493e3d2
date: 2024-11-07 12:00:00
---

最近，我在研究安卓设备上私人DNS、代理软件与DNS泄露的问题，使用IPCheck.ing进行了多次测试，发现了一些有趣的现象。

### 问题背景

在使用代理软件时，启用国内的DoT会导致DNS泄露，而不使用DoT则可能暴露真实IP。此外，境外的许多DoT服务被屏蔽，增加了日常使用的复杂性。

### 遇到的问题

1. **国内DoT与代理软件**：
  * 当使用国内DoT时，代理软件可能导致DNS泄露，无法有效隐藏请求路径。
2. **不使用DoT的风险**：
  * 如果不使用DoT，DNS请求会通过运营商的DNS，存在被监控和暴露真实IP的风险。
3. **境外DoT的局限性**：
  * 由于许多境外DoT被屏蔽，无法使用，给网络体验带来困扰。

### 问题根源

这些问题主要**源于安卓系统的限制**。在启用私人DNS后，代理软件无法修改DNS设置，即使是AdGuard等知名软件也面临类似挑战。

## 解决方案

经过多次尝试，我找到了一种平衡的方法：

把安卓私人DNS设置为dns.sb，这样可以有效避免DNS泄露。尽管在国内响应稍慢，但未被屏蔽，并能根据IP自动选择服务器。如果介意响应速度，日常使用时可以切换到国内的DoT；需要更高安全时，再切换到DNS.sb。

通过这些调整，我能够在不同场景下有效保护隐私，同时提升网络稳定性

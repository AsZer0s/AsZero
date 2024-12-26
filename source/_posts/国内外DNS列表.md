---
title: 国内外DNS列表
tags: 
  - 隐私
  - 网络
abbrlink: 5068ae4e
date: 2024-11-09 17:26:24
---

国内外知名免费公共DoT/DoH加密DNS服务器(含IPV6)

**注意**

> 1. `加密DNS`传输过程中`第三方无法查看`
> 无法污染DNS结果`不代表`DNS服务器本身不作恶
>
> 2. 在国内使用国外加密DNS有可能无法上网
> 能使用`8.8.8.8`上网不代表 `DoH(https://8.8.8.8/dns-query)` 就可以访问
> 经测试大多数国外DoH在国内都`被屏蔽`
> 能使用的解析速度也很慢

## 阿里公共DNS
IPv4:
```bash
223.5.5.5
223.6.6.6
```

IPv6:
```bash
2400:3200::1
2400:3200:baba::1
```

DoH:
```bash
https://223.5.5.5/dns-query
https://223.6.6.6/dns-query
https://dns.alidns.com/dns-query
```

DoT:
```bash
dns.alidns.com
23.5.5.5
223.6.6.6
```

## 腾讯公共DNS(DNSPod)
IPv4:
```bash
119.29.29.29
```

IPV6:
```bash
2402:4e00::
```

DoH:
```bash
https://doh.pub/dns-query
https://1.12.12.12/dns-query
https://120.53.53.53/dns-query
https://sm2.doh.pub/dns-query  # 国密
```

DoT:
```bash
dot.pub
1.12.12.12
120.53.53.53
```

## 百度公共DNS
IPV4:
```bash
180.76.76.76
```

IPV6:
```bash
2400:da00::6666
```

## 360公共DNS
电信/铁通/移动IPv4:
```bash
101.226.4.6
218.30.118.6
```

联通IPv4:
```bash
123.125.81.6
140.207.198.6
```

DoH:
```bash
https://doh.360.cn
```

DoT:
```bash
dot.360.cn
```

## CNNIC DNS
IPV4:
```bash
1.2.4.8
210.2.4.8
```

IPV6:
```bash
2001:dc7:1000::1
```

## 台湾Quad 101(twnic)
IPV4:
```bash
101.101.101.101
101.102.103.104
```

IPV6:
```bash
2001:de4::101
2001:de4::102
```

DoH:
```bash
https://dns.twnic.tw/dns-query
```

## Google公共DNS
IPv4:
```bash
8.8.8.8
8.8.4.4
```

IPV6:
```bash
2001:4860:4860::8888
2001:4860:4860::8844
```

DoH:
```bash
https://dns.google/dns-query
https://8.8.8.8/dns-query
https://8.8.4.4/dns-query
```

DoT:
```bash
dns.google
8.8.8.8
8.8.4.4
```

## Cloudflare公共DNS
IPV4:
```bash
1.1.1.1
1.0.0.1
```

IPV6:
```bash
2606:4700:4700::1111
2606:4700:4700::1001
```

DoH:
```bash
https://1.1.1.1/dns-query
https://1.0.0.1/dns-query
https://cloudflare-dns.com/dns-query
```

DoT:
```bash
1.1.1.1
1.0.0.1
1dot1dot1dot1.cloudflare-dns.com
cloudflare-dns.com
one.one.one.one
```

## DNS.SB公共DNS
IPv4:
```bash
185.222.222.222
45.11.45.11
```

IPV6:
```bash
2a09::
2a11::
```

DoH:
```bash
https://doh.sb/dns-query
https://doh.dns.sb/dns-query # 和上一个相同, 只是域名不一样
https://45.11.45.11/dns-query
https://185.222.222.222/dns-query
```

DoT:
```bash
dot.sb
185.222.222.222
45.11.45.11
```

DoH香港节点:
```bash
https://hk-hkg.doh.sb/dns-query 
https://dns.sb/doh/
```

## AdGuard 公共DNS
IPV4默认过滤广告:
```bash
94.140.14.14
94.140.15.15
```

IPV4无过滤:
```bash
94.140.14.140
94.140.14.141
```

IPV4家庭保护(过滤广告与成人内容):
```bash
94.140.14.15
94.140.15.16
```

DoH默认过滤广告:
```bash
https://dns.adguard.com/dns-query
```

DoH家庭保护(过滤广告与成人内容):
```bash
https://dns-family.adguard.com/dns-query
```

DoH非过滤:
```bash
https://dns-unfiltered.adguard.com/dns-query
```

DoT默认过滤广告:
```bash
dns.adguard.com
```

DoT家庭保护(过滤广告与成人内容):
```bash
dns-family.adguard.com
```

DoT非过滤:
```bash
dns-unfiltered.adguard.com
```

## OpenDNS(Cisco)
IPv4:
```bash
208.67.222.222
208.67.220.220
```

IPV4 Family:
```bash
208.67.222.123
208.67.220.123
```

IPV6:
```bash
2620:0:ccc::2
2620:0:ccd::2
```

DoH:
```bash
https://doh.opendns.com/dns-query
```

DoH Family:
```bash
https://doh.familyshield.opendns.com/dns-query
```

DoT:
```bash
dns.umbrella.com
```

## IBM Quad9
IPv4默认安全:
```bash
9.9.9.9
149.112.112.112
```

IPv6默认安全:
```bash
2620:fe::fe
2620:fe::fe:9
```

DoH默认:
```bash
https://dns.quad9.net/dns-query
```

DoT默认:
```bash
dns.quad9.net
```

IPv4无过滤:
```bash
9.9.9.10
149.112.112.10
```

IPv6无过滤:
```bash
2620:fe::10
2620:fe::fe:10
```

DoH无过滤:
```bash
https://dns10.quad9.net/dns-query
```

DoT无过滤:
```bash
dns10.quad9.net
```

IPv4 ECS保护:
```bash
9.9.9.11
149.112.112.11
```

IPv6 ECS保护:
```bash
2620:fe::11
2620:fe::fe:11
```

DoH ECS保护:
```bash
https://dns11.quad9.net/dns-query
```

DoT ECS保护:
```bash
dns11.quad9.net
```

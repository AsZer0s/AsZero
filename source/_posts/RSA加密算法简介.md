---
title: RSA加密算法简介
tags: 
  - RSA
  - 杂谈
  - 密码学
  - 安全
abbrlink: 59d9dfef
date: 2024-11-28 11:22:24
---

## 概述
RSA加密算法是一种非对称加密算法，在公开密钥加密和电子商业中被广泛使用。RSA是由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）在1977年一起提出的。当时他们三人都在麻省理工学院工作。RSA就是他们三人姓氏开头字母拼在一起组成的

## 前置知识
### 欧拉函数
在数论中，对正整数n，欧拉函数$\displaystyle \varphi (n)$是小于等于$\displaystyle n$的正整数中与$\displaystyle n$互质的数的数目。例如$\displaystyle \varphi \left(8\right)=4$，因为1、3、5和7均与8互质。
欧拉函数是积性函数，即是说若$\displaystyle m,n$互质，则：
$$\displaystyle \varphi (mn)=\varphi (m)\varphi (n)
$$
使用中国剩余定理有较简略的证明：设$\displaystyle A,B,C$是跟$\displaystyle m,n ,mn$互质的数的集，据中国剩余定理，$\displaystyle A\times B$和$\displaystyle C$可建立双射（一一对应）关系，因此两者元素个数相等

### 欧拉定理
在数论中，欧拉定理（也称费马-欧拉定理）是一个关于同余的性质。欧拉定理表明，若$\displaystyle n,a$为正整数，且$\displaystyle n,a$互素（即$\displaystyle \gcd(a,n)=1$），则：
$$\displaystyle a^{\varphi (n)}\equiv 1{\pmod {n}}
$$
即$\displaystyle a^{\varphi (n)}$与$\displaystyle 1$在模$\displaystyle n$下同余。欧拉定理实际上是费马小定理的推广

### 模逆元
模逆元（Modular multiplicative inverse）也称为模倒数、数论倒数。
一整数$\displaystyle a$对同余$\displaystyle n$之模逆元是指满足以下公式的整数$\displaystyle b$：
$$\displaystyle a^{-1}\equiv b{\pmod {n}}.
$$
也可以写成$\displaystyle ab\equiv 1{\pmod {n}}$或者$\displaystyle ab\mod {n}=1$。
整数$\displaystyle a$对模数$\displaystyle n$之模逆元存在的充分必要条件是$\displaystyle a$和$\displaystyle n$互素，若此模逆元存在，在模数$\displaystyle n$下的除法可以用和对应模逆元的乘法来达成，此概念和实数除法的概念相同

## RSA算法
### 公钥与私钥的产生
假设Alice想要通过不可靠的媒体接收Bob的私人消息。她可以用以下的方式来产生一个公钥和一个私钥：

1. 随意选择两个大的素数$\displaystyle p$和$\displaystyle q$，$\displaystyle p$不等于$\displaystyle q$，计算$\displaystyle N=pq$。
2. 根据欧拉函数，求得$\displaystyle r=\varphi (N)=\varphi (p)\times \varphi (q)=(p-1)(q-1)$。
3. 选择一个小于$\displaystyle r$的整数$\displaystyle e$，使$\displaystyle e$与$\displaystyle r$互质。并求得$\displaystyle e$关于$\displaystyle r$的模逆元，命名为$\displaystyle d$（求$\displaystyle d$令$\displaystyle ed\equiv 1{\pmod {r}}$）。（模逆元存在，当且仅当$\displaystyle e$与$\displaystyle r$互质。）
4. 将$\displaystyle p$和$\displaystyle q$的记录销毁

其中，$\displaystyle (N,e)$是公钥，$\displaystyle (N,d)$是私钥。Alice将她的公钥$\displaystyle (N,e)$传给Bob，而将她的私钥$\displaystyle (N,d)$藏起来

### 加密消息
假设Bob想给Alice送消息$\displaystyle m$，他知道Alice产生的$\displaystyle N$和$\displaystyle e$。他使用起先与Alice约好的格式将$\displaystyle m$转换为一个小于$\displaystyle N$的非负整数$\displaystyle n$，比如他可以将每一个字转换为这个字的Unicode码，然后将这些数字连在一起组成一个数字。假如他的信息非常长的话，他可以将这个信息分为几段，然后将每一段转换为$\displaystyle n$。用下面这个公式他可以将$\displaystyle n$加密为$\displaystyle c$：
$$\displaystyle c=n^{e}{\bmod {N}}
$$
这里的$\displaystyle c$可以用模幂算法快速求出来。Bob算出$\displaystyle c$后就可以将它传递给Alice

### 解密消息
Alice得到Bob的消息$\displaystyle c$后就可以利用她的密钥$\displaystyle d$来解码。她可以用以下这个公式来将$\displaystyle c$转换为$\displaystyle n$：
$$\displaystyle c=n^{e}{\bmod {N}}
$$
与Bob计算$\displaystyle c$类似，这里的$\displaystyle n$也可以用模幂算法快速求出。得到$\displaystyle n$后，她可以将原来的信息$\displaystyle m$重新复原
解码的原理是
$$\displaystyle c^{d}\equiv n^{e\cdot d}\ (\mathrm {mod} \ N)
$$
已知$\displaystyle ed\equiv 1{\pmod {r}}$，即 $\displaystyle ed=1+h\varphi (N)$。那么有
$$\displaystyle n^{ed}=n^{1+h\varphi (N)}=n\cdot n^{h\varphi (N)}=n\left(n^{\varphi (N)}\right)^{h}
$$

若$\displaystyle n$与$\displaystyle N$互素，则由欧拉定理得：

$$\displaystyle n^{ed}\equiv n\left(n^{\varphi (N)}\right)^{h}\equiv n(1)^{h}\equiv n{\pmod {N}}
$$

若$\displaystyle n$与$\displaystyle N$不互素，则不失一般性考虑$\displaystyle n=ph$，以及$\displaystyle ed-1=k(q-1)$，得：

$$\displaystyle n^{ed}=(ph)^{ed}\equiv 0\equiv ph\equiv n{\pmod {p}}
$$
$$\displaystyle n^{ed}=n^{ed-1}n=n^{k(q-1)}n=(n^{q-1})^{k}n\equiv 1^{k}n\equiv n{\pmod {q}}
$$
故$\displaystyle n^{ed}\equiv n{\pmod {N}}$得证

### 签名消息
RSA也可以用来为一个消息署名。假如Alice想给Bob传递一个署名的消息的话，那么她可以为她的消息计算一个散列值（Message digest），然后用她的私钥“加密”（如同前面“加密消息”的步骤）这个散列值并将这个“署名”加在消息的后面。这个消息只有用她的公钥才能被解密。Bob获得这个消息后可以用Alice的公钥“解密”（如同前面“解密消息”的步骤）这个散列值，然后将这个数据与他自己为这个消息计算的散列值相比较。假如两者相符的话，那么Bob就可以知道发信人持有Alice的私钥，以及这个消息在传播路径上没有被篡改过

## RSA安全性
假设偷听者Eve获得了Alice的公钥$\displaystyle N$和$\displaystyle e$以及Bob的加密消息$\displaystyle c$，但她无法直接获得Alice的密钥$\displaystyle d$。要获得$\displaystyle d$，最简单的方法是将$\displaystyle N$分解为$\displaystyle p$和$\displaystyle q$，这样她可以得到同余方程
$$\displaystyle de\equiv 1(\mathrm {mod} (p-1)(q-1))
$$
并解出$\displaystyle d$，然后代入解密公式
$$\displaystyle c^{d}\equiv n\ (\mathrm {mod} \ N)
$$
导出$\displaystyle n$（破密）
至今为止还没有人找到一个多项式时间的算法来分解一个大的整数的因子，也没有找到比因数分解更简单的破密方法。因此今天一般认为只要$\displaystyle N$足够大，黑客就没有办法破解
NIST建议的RSA密钥长度为至少2048位。实现上，强制设置密钥长度为2048位的称RSA或RSA2（意即RSA version 2），而未强制设置的称RSA1以资区别，两者差异主要在密钥长度

## 参考资料
维基百科：[欧拉函数](https://zh.wikipedia.org/wiki/%E6%AC%A7%E6%8B%89%E5%87%BD%E6%95%B0)
维基百科：[欧拉定理（数论）](https://zh.wikipedia.org/wiki/%E6%AC%A7%E6%8B%89%E5%AE%9A%E7%90%86_(%E6%95%B0%E8%AE%BA))
维基百科：[模逆元](https://zh.wikipedia.org/wiki/%E6%A8%A1%E5%8F%8D%E5%85%83%E7%B4%A0)
维基百科：[模幂](https://zh.wikipedia.org/wiki/%E6%A8%A1%E5%B9%82)
维基百科：[RSA加密算法](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)

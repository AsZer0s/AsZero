---
title: JavaScript中forEach方法的async/await异步问题
date: 2024-12-19 11:00:35
tags: ['开发','前端','JavaScript']
---

最近在用Node JS写个小项目的时候发现了一个之前没有注意过的问题
数组使用forEach方法进行异步操作时执行顺序可能会出现问题
这篇文章就来简单谈一谈产生这个问题具体原因以及解决方法

## 问题描述
当时遇到的问题与SQL写入操作有关，简化一下相当于：
```JavaScript
var numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numList.forEach(async (e)=>{
    await new Promise((res, rej)=>{
        //模拟一个耗时不确定的异步过程
        setTimeout(()=>{
            console.log(e)
            res(e);
        }, Math.random()*1000); 
    });
});
```

本来期望的是使用await来阻塞异步函数，使其按循环顺序得到结果
但实际得到的却是一个随机的数列
下面来分析一下原因

## for循环中的情况
将上面的代码用for循环改写得到
```JavaScript
var numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

(async function(){
    for (let index = 0; index < numList.length; index++) {
        const element = numList[index];
        await new Promise((res, rej)=>{
            //模拟一个耗时不确定的异步过程
            setTimeout(()=>{
                console.log(element)
                res(element);
            }, Math.random()*1000); 
        });
    }
})();
```

运行得到的结果是按顺序排列的。用同样的方式分别用for…of循环以及map、filter、reduce等方法将代码进行改写，测试后得出结论：
**async/await在for/for…of循环中可以正常按期望运行，在使用回调函数的数组方法(forEach、map、filter、reduce)时会出现问题**

## 原因探究
其实说到这里解决方法已经很明显了，**将数组方法(forEach)替换为循环(for/for…of)即可解决**，那么我们继续来探究一下具体的原因。
众所周知，await/async本质上就是Promise的一个语法糖，所以问题应该是出现在forEach方法上。
通过查阅MDN文档，我找到了forEach方法的Pollyfill如下(也看到了对这个问题的特别提醒。。。早点看就不会出这个问题了)
```JavaScript
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}
```

可以看到，第56行在while循环内直接调用了我们的回调函数
由于await必须位于异步函数之中，要与async成对使用，导致我们传入的回调函数其实是一个异步函数(或者说是Promise)
由于没有await的阻塞，循环内部按异步执行，导致了顺序与期望的不同
**而解决方法就是将数组方法(forEach)替换为循环(for/for…of)**

## 参考资料：
[MDN Web Doc: Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
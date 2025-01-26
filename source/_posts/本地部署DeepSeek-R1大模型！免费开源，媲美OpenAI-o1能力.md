---
title: 本地部署DeepSeek-R1大模型！免费开源，媲美OpenAI-o1能力
date: 2025-01-26 10:44:20
tags: 
   - 大模型
   - DeepSeek
---

最近，一家名叫DeepSeek的初创公司经过技术迭代与升级，发布了全新一代大模型，“DeepSeek-V3”

由于这款大模型太过好用，DeepSeek R1 更是直接免费开源，在AI发烧友圈子传播后，传到了海外社交平台、技术论坛，引发了海外网友的连连称赞

![DeepSeek Logo](https://s2.loli.net/2025/01/26/ZMcrqlg2YuPEX8Q.png)

各项性能指标更是和OpenAI-o1 模型不相上下，甚至做到了小部分的超越，关键是开源的，我们可以本地部署使用

![DeepSeek对比](https://s2.loli.net/2025/01/26/lHLGOCd1cjJv6oT.png)

## 1、本地部署，我们可以通过Ollama来进行安装
Ollama 官方版：【[点击前往](https://ollama.com/)】
Web UI 控制端【[点击安装](https://chromewebstore.google.com/detail/page-assist-%E6%9C%AC%E5%9C%B0-ai-%E6%A8%A1%E5%9E%8B%E7%9A%84-web/jfgfiigpkhlkbnfnbobbkinehhfdhndo)】

## 安装命令

### Ollama模型
1.5B Qwen DeepSeek R1
```bash
ollama run deepseek-r1:1.5b
```

7B Qwen DeepSeek R1
```bash
ollama run deepseek-r1:7b
```

8B Llama DeepSeek R1
```bash
ollama run deepseek-r1:8b
```

14B Qwen DeepSeek R1
```bash
ollama run deepseek-r1:14b
```

32B Qwen DeepSeek R1
```bash
ollama run deepseek-r1:32b
```

70B Llama DeepSeek R1
```bash
ollama run deepseek-r1:70b
```

### 更多模型下载

DeepSeek-R1
|       模型       	| #总参数 	| #已激活参数 	| 上下文长度 	|      下载     	|
|:----------------:	|:-------:	|:-----------:	|:----------:	|:-------------:	|
| DeepSeek-R1-Zero 	| 671B    	| 37B         	| 128千      	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Zero) 	|
| DeepSeek-R1      	| 671B    	| 37B         	| 128千      	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1) 	|
DeepSeek-R1-Zero 和 DeepSeek-R1 基于 DeepSeek-V3-Base 进行训练
有关模型架构的更多详细信息，请参阅DeepSeek-V3存储库

DeepSeek-R1-Distill 模型
|              模型             	|        基础模型        	|      下载     	|
|:-----------------------------:	|:----------------------:	|:-------------:	|
| DeepSeek-R1-Distill-Qwen-1.5B 	| [Qwen2.5-Math-1.5B](https://huggingface.co/Qwen/Qwen2.5-Math-1.5B)      	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B) 	|
| DeepSeek-R1-Distill-Qwen-7B   	| [Qwen2.5-Math-7B](https://huggingface.co/Qwen/Qwen2.5-Math-7B)        	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B) 	|
| DeepSeek-R1-Distill-Llama-8B  	| [Llama-3.1-8B](https://huggingface.co/meta-llama/Llama-3.1-8B)           	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-8B) 	|
| DeepSeek-R1-Distill-Qwen-14B  	| [Qwen2.5-14B](https://huggingface.co/Qwen/Qwen2.5-14B)            	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B) 	|
| DeepSeek-R1-Distill-Qwen-32B  	| [Qwen2.5-32B](https://huggingface.co/Qwen/Qwen2.5-32B)            	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B) 	|
| DeepSeek-R1-Distill-Llama-70B 	| [Llama-3.3-70B-Instruct](https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct) 	| 🤗 [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B) 	|
DeepSeek-R1-Distill 模型基于开源模型进行了微调，使用了 DeepSeek-R1 生成的样本
我们对其配置和分词器进行了轻微更改
请使用我们的设置来运行这些模型

## 评估结果
### DeepSeek-R1-评估
对于我们所有的模型，最大生成长度设置为 32,768 个 token
对于需要采样的基准，我们使用的温度为0.6，top-p 值为0.95，并为每个查询生成 64 个响应来估计 pass@1
| 类别 	|        基准（公制）        	| Claude 3.5 Sonnet-1022 	| GPT-4o 0513 	| DeepSeek V3 	| OpenAI o1-mini 	| OpenAI o1-1217 	| DeepSeek R1 	|
|:----:	|:--------------------------:	|:------------------------:	|:-----------:	|:-----------:	|:--------------:	|:--------------:	|:-----------:	|
|      	| 建筑学                     	| –                        	| –           	| 教育部      	| –              	| –              	| 教育部      	|
|      	| # 激活参数                 	| –                        	| –           	| 37B         	| –              	| –              	| 37B         	|
|      	| # 总参数                   	| –                        	| –           	| 671B        	| –              	| –              	| 671B        	|
| 英语 	| MMLU（通过@1）             	| 88.3                     	| 87.2        	| 88.5        	| 85.2           	| 91.8           	| 90.8        	|
|      	| MMLU-Redux（EM）           	| 88.9                     	| 88.0        	| 89.1        	| 86.7           	| –              	| 92.9        	|
|      	| MMLU-Pro（EM）             	| 78.0                     	| 72.6        	| 75.9        	| 80.3           	| –              	| 84.0        	|
|      	| 掉落 (3 发 F1)             	| 88.3                     	| 83.7        	| 91.6        	| 83.9           	| 90.2           	| 92.2        	|
|      	| IF-Eval（提示严格）        	| 86.5                     	| 84.3        	| 86.1        	| 84.8           	| –              	| 83.3        	|
|      	| GPQA-钻石级 (Pass@1)       	| 65.0                     	| 49.9        	| 59.1        	| 60.0           	| 75.7           	| 71.5        	|
|      	| SimpleQA（正确）           	| 28.4                     	| 38.2        	| 24.9        	| 7.0            	| 47.0           	| 30.1        	|
|      	| 框架（配件）               	| 72.5                     	| 80.5        	| 73.3        	| 76.9           	| –              	| 82.5        	|
|      	| AlpacaEval2.0 (LC-胜率)    	| 52.0                     	| 51.1        	| 70.0        	| 57.8           	| –              	| 87.6        	|
|      	| ArenaHard（GPT-4-1106）    	| 85.2                     	| 80.4        	| 85.5        	| 92.0           	| –              	| 92.3        	|
| 代码 	| LiveCodeBench (Pass@1-COT) 	| 33.8                     	| 34.2        	| –           	| 53.8           	| 63.4           	| 65.9        	|
|      	| Codeforces（百分位数）     	| 20.3                     	| 23.6        	| 58.7        	| 93.4           	| 96.6           	| 96.3        	|
|      	| Codeforces（评级）         	| 717                      	| 759         	| 1134        	| 1820           	| 2061           	| 2029        	|
|      	| SWE 已验证（已解决）       	| 50.8                     	| 38.8        	| 42.0        	| 41.6           	| 48.9           	| 49.2        	|
|      	| Aider-Polyglot (Acc.)      	| 45.3                     	| 16.0        	| 49.6        	| 32.9           	| 61.7           	| 53.3        	|
| 数学 	| AIME 2024（通行证@1）      	| 16.0                     	| 9.3         	| 39.2        	| 63.6           	| 79.2           	| 79.8        	|
|      	| 数学-500 (通过@1)          	| 78.3                     	| 74.6        	| 90.2        	| 90.0           	| 96.4           	| 97.3        	|
|      	| CNMO 2024 (通行证@1)       	| 13.1                     	| 10.8        	| 43.2        	| 67.6           	| –              	| 78.8        	|
| 中文 	| CLUEWSC（EM）              	| 85.4                     	| 87.9        	| 90.9        	| 89.9           	| –              	| 92.8        	|
|      	| C-评估（EM）               	| 76.7                     	| 76.0        	| 86.5        	| 68.9           	| –              	| 91.8        	|
|      	| C-SimpleQA（正确）         	| 55.4                     	| 58.7        	| 68.0        	| 40.3           	| –              	| 63.7        	|

### 蒸馏模型评估
|              模型             	| AIME 2024 通行证@1 	| AIME 2024 缺点@64 	| MATH-500 通过@1 	| GPQA 钻石通行证@1 	| LiveCodeBench 通行证@1 	| CodeForces 评级 	|
|:-----------------------------:	|:------------------:	|:-----------------:	|:---------------:	|:-----------------:	|:----------------------:	|:---------------:	|
| GPT-4o-0513                   	| 9.3                	| 13.4              	| 74.6            	| 49.9              	| 32.9                   	| 759             	|
| 克劳德-3.5-十四行诗-1022      	| 16.0               	| 26.7              	| 78.3            	| 65.0              	| 38.9                   	| 717             	|
| o1-迷你                       	| 63.6               	| 80.0              	| 90.0            	| 60.0              	| 53.8                   	| 1820            	|
| QwQ-32B-预览                  	| 44.0               	| 60.0              	| 90.6            	| 54.5              	| 41.9                   	| 1316            	|
| DeepSeek-R1-Distill-Qwen-1.5B 	| 28.9               	| 52.7              	| 83.9            	| 33.8              	| 16.9                   	| 954             	|
| DeepSeek-R1-Distill-Qwen-7B   	| 55.5               	| 83.3              	| 92.8            	| 49.1              	| 37.6                   	| 1189            	|
| DeepSeek-R1-Distill-Qwen-14B  	| 69.7               	| 80.0              	| 93.9            	| 59.1              	| 53.1                   	| 1481            	|
| DeepSeek-R1-Distill-Qwen-32B  	| 72.6               	| 83.3              	| 94.3            	| 62.1              	| 57.2                   	| 1691            	|
| DeepSeek-R1-Distill-Llama-8B  	| 50.4               	| 80.0              	| 89.1            	| 49.0              	| 39.6                   	| 1205            	|
| DeepSeek-R1-Distill-Llama-70B 	| 70.0               	| 86.7              	| 94.5            	| 65.2              	| 57.5                   	| 1633            	|

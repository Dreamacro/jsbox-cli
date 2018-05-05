# jsbox-cli

JSBox VSCode 插件的 cli 版本.

## Installation

```
$ npm i jsbox-cli -g
```

## Getting Started

设置手机端 Host IP

```
$ jsbox set 192.168.1.1
```

查看当前的 Host IP

```
$ jsbox host
```

监听一个目录或文件

```
# 监听当前目录
$ jsbox watch

# 监听指定目录
$ jsbox watch ./dist

# 监听指定文件
$ jsbox watch ./index.js
```

更新日志
===

#### 发布周期

* 每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）。
* 每月发布一个带有新特性的向下兼容的版本。
* 含有破坏性升级的版本更新不在发布周期内。

更新日志也可以在[Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases)查看

# 0.6.12

`2018-01-20`

### HotFix
* 修复 `Upload` 引入 `HttpClientModule` 导致 `HttpInterceptor` 失效的问题 [#931](https://github.com/NG-ZORRO/ng-zorro-antd/pull/931) [@cipchk](https://github.com/cipchk)
* 将文档系统中 `highlight.js` 替换为 `prismjs` 解决 travis ci 失效问题 [#932](https://github.com/NG-ZORRO/ng-zorro-antd/pull/932)

```javascript
function a() {
  return '1'
}

```

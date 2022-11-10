# 说明
## 修改须知

### 使用moment en/ zh-cn 之外的包都需要修改 webpack的配置
> `new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/)`

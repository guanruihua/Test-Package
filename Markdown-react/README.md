# 说明

## markdown
markdown

- [react-markdown - npm (npmjs.com)](https://www.npmjs.com/package/react-markdown)
- [remarkjs/remark-gfm: remark plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists) (github.com)](https://github.com/remarkjs/remark-gfm)

## 修改须知

### 路由组件传参
> 目前只支持:id这类
> 不支持?id=[id]

### table多语言控件修改
> 给table 的多语言框添加语言, 需要修改 
> - src\assets\type\index.ts tLang (这个只增, 尽量不要减)
> - src\assets\common\module\TableStore.ts中 langAdapter

### 使用moment en/ zh-cn 之外的包都需要修改 webpack的配置
> `new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/)`
> 在最后添加你需要使用的包
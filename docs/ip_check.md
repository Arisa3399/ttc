# 外部公開サイトと内部のみ閲覧できるサイトに分けてセキュリティ構築する。

# アクセス制御用のAPIを設置
- http://www.ttc.t.u-tokyo.ac.jp/api/api.php
- レスポンスはjsonで以下のように受け取ることができる。
```
{
  "ip": "202.229.108.174", 
  "port": "80", 
  "server": "www.ttc.t.u-tokyo.ac.jp", 
  "uri": "/api.php", 
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36" 
}

```
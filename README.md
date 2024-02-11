東京大学大学院工学系研究科 技術部
===
```
Create : 2023-11-02
Author : Yugeta.Koji
```

# Summary
- 東京大学大学院工学系研究科 技術部のサイトをリニューアル構築する。
- 運用をgitベースで行うように設計（サイズの大きなデータアップロードはFTPを利用）
- 


# topページのニュース記事数
- 以下の箇所の、data-count属性の値最新（日付の新しい記事の表示を行う仕様）を変更することで記事数が変えられる。
```
<ul class='lists' data-count="5"></ul>
```

# 外部公開サイトと内部のみ閲覧できるサイトに分けてセキュリティ構築する。
- IPアドレス制御を実装
  - 以前サイトでは、apacheの.htaccessで実装していたが、今回はPHP(api)+javascriptで行う。

=======
# 外部公開サイトと内部のみ閲覧できるサイトに分けてセキュリティ構築する。
>>>>>>> main

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


# Auto Deploy設定作業
- 参考: 
  - https://hsmtweb.com/tool-service/github-actions.html
1. 本番サーバーにsshログイン
  - サーバー資料参照

2. サーバーでkey（鍵）の作成
> ssh-keygen -t rsa -b 4096 -C geta1972@gmail.com
- 鍵作成場所: /home/webpark1684/.ssh/id_rsa.
```
> The key fingerprint is:
SHA256:DoVCPPJ/fjDZSQHKQ+ePQdo0kuNn0XWtJOGLiH19QeA geta1972@gmail.com
```

3. 



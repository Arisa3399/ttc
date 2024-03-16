

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
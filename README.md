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


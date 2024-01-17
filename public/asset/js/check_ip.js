import { Asset }   from './asset.js'
import { Menu }    from './menu.js'
import { SvgImport } from './svg_import.js'

export class CheckIp{
  constructor(){console.log(1)
    this.load_ip()
  }

  // 許可IPの読み込み
  load_ip(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , "data/ip.json" , true)
    xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onload = this.loaded_ip.bind(this)
    xhr.send()
  }

  loaded_ip(e){
    if(!e || !e.target || !e.target.response){return}
    this.ip = e.target.response.split("\n")
    for(let i=0; i<this.ip.length; i++){
      this.ip[i] = this.adjustment_ip(this.ip[i])
    }
    this.check()
  }

  // アクセスユーザー情報の取得（サーバー問い合わせ）
  check(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , "http://www.ttc.t.u-tokyo.ac.jp/api/api.php" , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = this.checked.bind(this)
    xhr.send()
  }

  // 許可IPにマッチするか確認
  checked(e){
    if(!e || !e.target || !e.target.response){return}
    const user_info = JSON.parse(e.target.response)
    let flg = false
    for(const ip of this.ip){
      if(!ip){continue}
      const ip3 = this.adjustment_ip(ip)
      const reg = RegExp(`^${ip3}`)
      if(user_info.ip.match(reg)){
        flg = true
        break
      }
    }

    // IPマッチ
    if(flg){
      this.init()
    }

    // IPアンマッチ
    else{
      // this.init()
      // this.error()
    }
  }

  adjustment_ip(ip){
    if(!ip){return null}
    const num4 = ip.split(".")
    for(let i=0; i<num4.length; i++){
      num4[i] = ("00"+num4[i]).slice(-3)
    }
    return num4.join(".")
  }

  // 許可されている場合、正常表示
  init(){
    const elms = document.querySelectorAll(".site-change")
    for(const elm of elms){
      elm.style.setProperty("display","block","")
    }
    // new Menu()
    // new SvgImport()
    // new Asset({
    //   callback : this.loaded.bind(this)
    // })
  }


  get html(){
    return document.querySelector('html')
  }
  get loading(){
    return document.querySelector('.loading')
  }
  loaded(){
    // new Trigger()
    const status = this.html.getAttribute('data-status')
    if(status === 'loading'){
      this.html.removeAttribute('data-status')
    }
    if(this.loading){
      this.loading.style.setProperty('display','none','')
    }
  }

  // 許可されていない場合、topに戻る
  error(){
    // location.href = './'
  }
}

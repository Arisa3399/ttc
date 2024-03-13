import { Asset }   from './asset.js'
import { Menu }    from './menu.js'
// import { Lang }    from './lang.js'
// import { Trigger } from './trigger.js'
import { SvgImport } from './svg_import.js'
import { CheckIp }   from "./check_ip.js"

class Main{
  constructor(){
    new Menu()
    
    new Asset({
      callback : this.loaded.bind(this)
    })
    // new Lang()
    new CheckIp()
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
    new SvgImport()
  }
}


switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Main()
  break

  default:
    window.addEventListener('DOMContentLoaded' , (()=>new Main()))
  break
}
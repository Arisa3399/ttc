import { Asset } from './asset.js'
import { Menu }  from './menu.js'
import { Lang }  from './lang.js'

class Main{
  constructor(){
    new Asset({
      callback : this.loaded.bind(this)
    })
    new Menu()
    new Lang()
  }
  get html(){
    return document.querySelector('html')
  }
  loaded(){
    const status = this.html.getAttribute('data-status')
    if(status === 'loading'){
      this.html.removeAttribute('data-status')
    }
  }
}


switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Main()
    break
  default:
    window.addEventListener('DOMContentLoaded' , (()=>new Main()))
}
import { Convert } from '../../../asset/js/convert.js'

class Main{
  constructor(){
    this.load_templ()
  }
  get path_temp(){
    return `page/news/asset/list.html`
  }
  get path_data(){
    return `data/news.json`
  }
  get elm_lists(){
    return document.querySelector('.news ul.lists')
  }

  get list_count(){
    const count = this.elm_lists.getAttribute('data-count')
    return Number(count || 0)
  }

  load_templ(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.path_temp , true)
    xhr.setRequestHeader('Content-Type', 'text/html');
    xhr.onload = this.loaded_temp.bind(this)
    xhr.send()
  }
  loaded_temp(e){
    if(!e || !e.target || !e.target.response){return}
    this.temp = e.target.response
    this.load_date()
  }

  load_date(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.path_data , true)
    xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onload = this.loaded_date.bind(this)
    xhr.send()
  }
  loaded_date(e){
    if(!e || !e.target || !e.target.response){return}
    const datas = JSON.parse(e.target.response)
    // this.view(datas.reverse())
    this.view(datas.sort((a,b) =>{
      if(a.date < b.date){return +1}
      if(a.date > b.date){return -1}
      return 0
    }))
  }
  view(datas){
    if(!datas || !datas.length){return}
    const datas2 = this.list_count ? datas.slice(0,this.list_count) : datas
    for(const data of datas2){
      const html = new Convert(this.temp).double_bracket(data)
      this.elm_lists.insertAdjacentHTML('beforeend' , html)
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
    break
}
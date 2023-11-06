import { Convert } from '../../../asset/js/convert.js'

class Award{
  constructor(){
    this.load_temp()
  }

  temp_path = `page/news/asset/award_list.html`
  data_path = `data/news_award.json`
  elm_lists = document.querySelector(`table.lists tbody`)

  load_temp(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.temp_path , true)
    xhr.setRequestHeader('Content-Type', 'text/html');
    xhr.onload = this.loaded_temp.bind(this)
    xhr.send()
  }
  loaded_temp(e){
    this.temp = e.target.response
    this.load()
  }

  load(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.data_path , true)
    xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onload = this.loaded.bind(this)
    xhr.send()
  }
  loaded(e){
    if(!e || !e.target || !e.target.response){return}
    const datas = JSON.parse(e.target.response)
    if(!datas || !datas.length){return}
    // 日付が新しい順にソート
    const datas2 = datas.sort((a,b)=>{
      if(a.date < b.date){return +1}
      if(a.date > b.date){return -1}
      return 0
    })
    for(const data of datas2){
      this.view(data)
    }
  }
  view(data){
    const html = new Convert(this.temp).double_bracket(data)
    this.elm_lists.insertAdjacentHTML('beforeend',html)
  }
}

switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Award()
    break
  default:
    window.addEventListener('DOMContentLoaded', (()=>new Award()))
    break
}
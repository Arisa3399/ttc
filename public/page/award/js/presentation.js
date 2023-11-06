import { Convert } from '../../../asset/js/convert.js'

export class Presentation{
  constructor(){
    this.load_temp()
  }

  temp_path = `page/award/asset/presentation_list.html`
  data_path = `data/presentation.json`
  elm_lists = document.querySelector(`section.presentation ul.lists`)

  load_temp(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.temp_path , true)
    xhr.setRequestHeader('Content-Type', 'text/html');
    xhr.onload = this.loaded_temp.bind(this)
    xhr.send()
  }
  loaded_temp(e){
    this.temp_collegge = e.target.response
    this.load_data()
  }

  load_data(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.data_path , true)
    xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onload = this.loaded_data.bind(this)
    xhr.send()
  }
  loaded_data(e){
    if(!e || !e.target || !e.target.response){return}
    const datas = JSON.parse(e.target.response)
    if(!datas || !datas.length){return}
    // // 日付が新しい順にソート
    // const datas2 = datas.sort((a,b)=>{
    //   if(a.date < b.date){return +1}
    //   if(a.date > b.date){return -1}
    //   return 0
    // })
    for(const data of datas){
      this.view(data)
    }
  }
  view(data){
    const html = new Convert(this.temp_collegge).double_bracket(data)
    this.elm_lists.insertAdjacentHTML('beforeend',html)
  }
}
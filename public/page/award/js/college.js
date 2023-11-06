import { Convert } from '../../../asset/js/convert.js'

export class College{
  constructor(){
    this.load_temp_college()
  }

  temp_college_path = `page/award/asset/college_list.html`
  data_college_path = `data/college_award.json`
  elm_college_lists = document.querySelector(`section.college table.lists tbody`)

  load_temp_college(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.temp_college_path , true)
    xhr.setRequestHeader('Content-Type', 'text/html');
    xhr.onload = this.loaded_temp_college.bind(this)
    xhr.send()
  }
  loaded_temp_college(e){
    this.temp_collegge = e.target.response
    this.load_college()
  }

  load_college(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.data_college_path , true)
    xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onload = this.loaded_college.bind(this)
    xhr.send()
  }
  loaded_college(e){
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
      this.view_college(data)
    }
  }
  view_college(data){
    const html = new Convert(this.temp_collegge).double_bracket(data)
    this.elm_college_lists.insertAdjacentHTML('beforeend',html)
  }
}
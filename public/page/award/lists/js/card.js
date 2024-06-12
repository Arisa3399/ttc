import { Urlinfo } from "../../../../asset/js/urlinfo.js"
import { Convert } from "../../../../asset/js/convert.js"

export class Card{
  constructor(){
    console.log("card")
    this.load_card_html()
  }

  get page_name(){
    return new Urlinfo().queries.p
  }

  get elm_list_root(){
    return document.querySelector(`ul.lists`)
  }

  load_card_html(){
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open('GET' , `page/${this.page_name}/asset/card.html` , true)
    xhr.setRequestHeader("Content-Type", "text/html")
    xhr.onload = this.loaded_card_html.bind(this)
    xhr.send()
  }
  loaded_card_html(e){
    this.card_html = e.target.response
    this.load_json()
  }

  load_json(){
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open('GET' , `data/award_lists.json` , true)
    xhr.setRequestHeader("Content-Type", "text/json")
    xhr.onload = this.loaded_json.bind(this)
    xhr.send()
  }

  loaded_json(e){
    const datas = JSON.parse(e.target.response)
    console.log(datas)
    this.view(datas)
  }

  view(datas){
    if(!datas || !datas.length){return}
    for(const data of datas){
      data.links = this.set_links(data.links)
      const html = new Convert(this.card_html).double_bracket(data)
      this.elm_list_root.insertAdjacentHTML("beforeend", html)
    }
  }
  set_links(links){
    const new_links = []
    for(const link of links){
      new_links.push(`<a href="${link.url}" target="_blank">${link.name}</a>`)
    }
    return new_links.join("\n")
  }
}
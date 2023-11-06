import { Urlinfo } from '../../../asset/js/urlinfo.js'

function Main(){
  const id = new Urlinfo().queries.id
  load()

  function load(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , `data/news.json` , true)
    xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onload = loaded.bind(this)
    xhr.send()
  }
  function loaded(e){
    // console.log(id,e.target.response)
    const data = JSON.parse(e.target.response)
    const content = data.find(e => String(e.id) === String(id))
    if(!content){return}
    // console.log(content)

    // title
    document.querySelector(`.title[data-lang='ja']`).innerHTML = content.title_ja
    document.querySelector(`.title[data-lang='en']`).innerHTML = content.title_en
    // text
    document.querySelector(`.news-content .content[data-lang='ja']`).innerHTML = content.text_ja
    document.querySelector(`.news-content .content[data-lang='en']`).innerHTML = content.text_en
    // url
    document.querySelector(`.news-content .url`).innerHTML = content.url ? `<a href='${content.url}'>${content.url}</a>` : ''
    // date
    document.querySelector(`.news-content .date`).innerHTML = `${content.date}</a>`
    // images
    const images = get_images(content.id, content.images)
    document.querySelector(`.news-content .images`).innerHTML = `${images}</a>`
  }

  function get_images(id,image_str){
    if(!image_str){return ''}
    const images = image_str.split(',')
    if(!images.length){return ''}
    let html = ''
    for(const image of images){
      html += `<img src='data/news/${id}/${image}'>`
    }
    return html
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

export class Asset{
  constructor(options){
    this.options = options || {}
    this.loads()
  }

  get files(){
    return [
      {
        name : 'header',
        selector : 'header',
        file : 'assets/html/header.html',
      },
      {
        name : 'footer',
        selector : 'footer',
        file : 'assets/html/footer.html',
      },
      {
        name : 'menu_left',
        selector : '#sideWrap1',
        file : 'assets/html/menu_left.html',
      },
      {
        name : 'menu_right',
        selector : '#sideWrap2',
        file : 'assets/html/menu_right.html',
      },
      {
        name : 'content',
        selector : '#mainWrap',
        file : 'pages/index.html',
      },
    ]
  }

  loads = function(){
    for(const file_data of this.files){
      this.load(file_data)
    }
  }
  load = function(data){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , data.file , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = this.loaded.bind(this , data)
    xhr.send()
  }
  loaded = function(data , e){
    const html = e.target.response
    const elm = document.querySelector(data.selector)
    
    elm.insertAdjacentHTML('beforeend' , html)
  }
}
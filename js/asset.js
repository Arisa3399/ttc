(()=>{
  function Asset(options){
    this.options = options || {}
    this.loads()
  }

  Asset.prototype.loads = function(){
    for(const file_data of this.options.files){
      this.load(file_data)
    }
  }
  Asset.prototype.load = function(data){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , data.file , true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = this.loaded.bind(this , data)
    xhr.send()
  }
  Asset.prototype.loaded = function(data , e){
    const html = e.target.response
    const elm = document.querySelector(data.selector)
    
    elm.insertAdjacentHTML('beforeend' , html)
  }

  new Asset({
    files : [
      {
        name : 'header',
        selector : 'header',
        file : 'assets/header.html',
      },
      {
        name : 'footer',
        selector : 'footer',
        file : 'assets/footer.html',
      },
      {
        name : 'menu_left',
        selector : '#sideWrap1',
        file : 'assets/menu_left.html',
      },
      {
        name : 'menu_right',
        selector : '#sideWrap2',
        file : 'assets/menu_right.html',
      },
      {
        name : 'content',
        selector : '#mainWrap',
        file : 'pages/index.html',
      },
    ]
  })
})()
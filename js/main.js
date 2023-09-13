(()=>{

  load_scripts()
  function load_scripts(){
    const script_lists = [
      'js/asset.js',
    ]
    for(const src of script_lists){
      const script = document.createElement('script')
      script.src = src
      document.querySelector('head').appendChild(script)
    }
  }

  function start(){
    // new window.Asset({
    //   files : [
    //     {
    //       name : 'header',
    //       selector : 'header',
    //       file : 'assets/header.html',
    //     },
    //     {
    //       name : 'footer',
    //       selector : 'footer',
    //       file : 'assets/header.html',
    //     },
    //   ]
    // })
  }



  switch(document.readyState){
    case 'complete':
    case 'interactive':
      start()
      break
    default:
      window.addEventListener('DOMContentLoaded' , start)
      break
  }
})()


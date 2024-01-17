(function(){
  function Main(){
    window.submitted = false;
    document.querySelector(`button[name='post']`).addEventListener('click' , click_button)
    set_iframe()
  }

  function set_iframe(){
    const iframe = document.createElement('iframe')
    iframe.id = "complete"
    iframe.name = "complete"
    iframe.onload = (()=>{
      const [url , query] = location.href.split('?')
      if(window.submitted === true){window.location= `${url}?p=contact&f=thanks`}
    })
    document.body.appendChild(iframe)
  }

  function click_button(){
    if(fail_require()){
      error('未入力の項目があります。')
    }
    else{
      submit()
    }
  }
  function fail_require(){
    const name   = document.querySelector(`input[data-name='name']`)
    const belong = document.querySelector(`input[data-name='belong']`)
    const mail   = document.querySelector(`input[data-name='mail']`)
    const memo   = document.querySelector(`textarea[data-name='memo']`)
    return !belong.value || !name.value || !mail.value || !memo.value ? true : false
  }
  function error(message){
    alert(message)
    document.querySelector('.error').textContent = message
  }
  function submit(){
    window.submitted = true
    document.forms.contact.submit()
  }

  switch(document.readyState){
    case 'complete':
    case 'interactive':
      new Main()
      break

    default:
      window.addEventListener('DOMContentLoaded', (()=>new Main()))
      break
  }
})()
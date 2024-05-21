import { Uuid } from "../../../asset/js/uuid.js"

(function(){
  function Main(){
    window.submitted = false;
    document.querySelector(`button[name='post']`).addEventListener('click' , click_button)
    set_event()
    set_form()
    set_iframe()
  }

  function set_event(){
    const input_file = document.querySelector(`input[name="file[]"]`)
    if(input_file){
      input_file.addEventListener("change" , change_input_file)
    }
  }

  function change_input_file(e){
    console.log(e.target.files)
    // const value = e.target.value.match("\\") ? e.target.value.split("\\").pop() : e.target.value.split("/").pop()
    // const value = e.target.value.split("/").pop()
    const value = get_files2value(e.target.files)
    document.querySelector(`.preview`).textContent = value

    // const preview = document.querySelector(`.preview`)
    // if(!preview){return}
    // const uuid = new Uuid().id
    // preview.innerHTML = ""
    // for(let i=0; i<e.target.files.length; i++){
    //   const file = e.target.files[i]
    //   const ext = get_ext(file.name)
    //   const id = `${uuid}-${i}`
    //   switch(ext){
    //     case "png":
    //     case "jpg":
    //     case "jpeg":
    //     case "gif":
    //     case "webp":
    //       const div = document.createElement("div")
    //       div.setAttribute("data-uuid" , id)
    //       const img = new Image()
    //       const url = URL.createObjectURL(file)
    //       img.src = url
    //       div.appendChild(img)
    //       const name = document.createElement("div")
    //       name.className = "name"
    //       name.textContent = file.name
    //       div.appendChild(name)
    //       preview.appendChild(div)
    //       break
    //     case "pdf":
    //       break
    //   }
    // }
  }

  function get_files2value(files){
    const lists = []
    for(const file of files){
      lists.push(file.name)
    }
    return lists.join(",")
  }

  function get_ext(filename){
    const sp = filename.split(".")
    const ext = sp.slice(-1).join("")
    return ext ? ext.toLowerCase() : null
  }

  function set_form(){
    const form = document.querySelector(`form[name="contact"]`)
    if(!form){return}
    form.action = "https://docs.google.com/forms/d/e/1FAIpQLSflfJ7DaBmSbE-kZZXuUEtre2r1CIdgWtabUzW3BFlrhijgYQ/formResponse"
    form.target = "complete"
    // form.addEventListener("submit" , (()=>{window.submitted=true}))
    // form.onsubmit = function(){return false}
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
    // console.log("submit")
    file_upload()
    // window.submitted = true
    // document.forms.contact.submit()
  }

  function file_upload(){
    console.log("file_upload")
    const formData = new FormData(document.forms.upload)
    // var files = document.querySelector(`input[type='file'][name='file']`).files;
    // for (let i=0; i<files.length; i++) {
    //   formData.append("file[]", files[i]);
    // }
    const req = new XMLHttpRequest();
    req.open("POST", "upload.php" , true);
    req.onload = file_uploaded
    req.send(formData);
  }

  // function google_form_send(){
  //   document.forms.contact.action = "https://docs.google.com/forms/d/e/1FAIpQLSflfJ7DaBmSbE-kZZXuUEtre2r1CIdgWtabUzW3BFlrhijgYQ/formResponse"
  // }

  function file_uploaded(e){
    if(!e || !e.target || !e.target.response){return}
    const res = JSON.parse(e.target.response)
    if(!res || res.status !== "success"){return}
    let value = ""
    for(let i=0; i<res.datas.length; i++){
      const data = res.datas[i]
      const path = location.pathname.split("/").slice(0,-1).join("/")
      const url = `${location.protocol}://${location.host}${path}/${data.path}`
      value += `# ${i} : ${data.base}\n${url}\n\n`
    }
    document.querySelector(`textarea[data-name="files"]`).value = value

    // uploadデータを除外する

    // google-form-submit
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
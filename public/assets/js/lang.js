
export class Lang{
  constructor(){
    this.init()
    this.set_event()
    Lang.set_active()
  }
  static get elm_html(){
    return document.querySelector('html')
  }
  static get elm_radio_arr(){
    return document.querySelectorAll(`[name='lang']`)
  }
  static get elm_radio_checked(){
    return document.querySelector(`[name='lang']:checked`)
  }
  static get html(){
    return Lang.elm_html.getAttribute('lang')
  }
  static get current(){
    const elm = Lang.elm_radio_checked
    if(elm){
      return elm.value
    }
    else{
      return Lang.elm_radio_arr[0].value
    }
  }
  init(){
    const cache_lang = Lang.get_cache() || Lang.current
    Lang.elm_html.setAttribute('lang' , cache_lang)
    Lang.set_radio(cache_lang)
  }
  set_event(){
    const elms = Lang.elm_radio_arr
    for(const elm of elms){
      elm.addEventListener('change' , this.change_lang.bind(this))
    }
  }
  change_lang(e){
    const lang = e.target.value
    Lang.elm_html.setAttribute('lang' , lang)
    Lang.set_cache(lang)
    Lang.set_active()
  }
  static set_cache(lang){
    window.localStorage.setItem('lang' , lang)
  }
  static get_cache(){
    return window.localStorage.getItem('lang')
  }
  static set_radio(lang){
    const elm = document.querySelector(`[name='lang'][value='${lang}']`)
    if(!elm){return}
    elm.checked = true
  }
  static set_active(){
    // const current_lang_elm = document.querySelector(`.menu .lang[for='lang_${Lang.current}']`)
    // if(!current_lang_elm){return}
    // current_lang_elm.setAttribute('data-status' , 'active')
    const elms = document.querySelectorAll(`.menu .lang`)
    for(const elm of elms){
      if(elm.getAttribute('for') === `lang_${Lang.current}`){
        elm.setAttribute('data-status' , 'active')
      }
      else{
        elm.setAttribute('data-status' , '')
      }
    }

  }
}

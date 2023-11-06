
export class Lang{
  constructor(){
    this.init()
    this.set_event()
    // Lang.set_active()
  }
  static get elm_html(){
    return document.querySelector('html')
  }
  static get elm_lang_toggle(){
    return document.getElementById('lang_toggle')
  }
  static get lang(){
    return Lang.elm_lang_toggle.checked === true ? "en" : "ja"
  }
  static get cache_key(){
    return "momoseken-lang"
  }
  // static get html(){
  //   return Lang.elm_html.getAttribute('lang')
  // }
  // static get current(){
  //   const elm = Lang.elm_radio_checked
  //   if(elm){
  //     return elm.value
  //   }
  //   else{
  //     return Lang.elm_radio_arr[0].value
  //   }
  // }
  init(){
    const cache_lang = Lang.get_cache() || Lang.lang
    Lang.elm_html.setAttribute('lang' , cache_lang)
    Lang.set_radio(cache_lang)
  }
  set_event(){
    // const elms = Lang.elm_radio_arr
    // for(const elm of elms){
    //   elm.addEventListener('change' , this.change_lang.bind(this))
    // }
    Lang.elm_lang_toggle.addEventListener('click' , this.change_lang.bind(this))
  }
  change_lang(e){
    const lang =Lang.lang
    Lang.elm_html.setAttribute('lang' , lang)
    Lang.set_cache(lang)
    // Lang.set_active()
  }
  static set_cache(lang){
    window.localStorage.setItem(Lang.cache_key , lang)
  }
  static get_cache(){
    return window.localStorage.getItem(Lang.cache_key)
  }
  static set_radio(lang){
    if(lang === 'ja'){
      this.elm_lang_toggle.checked = false
    }
    else{
      this.elm_lang_toggle.checked = true
    }
  }
  // static set_active(){
  //   const elms = document.querySelectorAll(`.menu .lang`)
  //   for(const elm of elms){
  //     if(elm.getAttribute('for') === `lang_${Lang.current}`){
  //       elm.setAttribute('data-status' , 'active')
  //     }
  //     else{
  //       elm.setAttribute('data-status' , '')
  //     }
  //   }

  // }
}

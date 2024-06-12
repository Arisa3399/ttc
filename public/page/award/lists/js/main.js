import { Card }    from "./card.js"

export class Main{
  constructor(){
    new Card()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
  break
  default:
    window.addEventListener("DOMContentLoaded" , (()=>new Main()))
}
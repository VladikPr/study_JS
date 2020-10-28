'use strict';

class DomElement{
    constructor(selector, height, width, bg,fontSize){
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    createElement(){
        let element;
        if (this.selector[0] === ".") {
            element = document.createElement('div');
            element.classList.add(this.selector.slice(1));
        } else if (this.selector[0] === "#") {
            element = document.createElement('p');
            element.id = this.selector.slice(1);
        }

        element.textContent = "Placeholder";
        element.style.cssText =`
            height: ${this.height}px;
            width: ${this.width}px;
            background: ${this.bg};
            font-size: ${this.fontSize}px;`;
        document.body.insertAdjacentElement("beforeend", element);
    }
}


const newElem = new DomElement('.newBlock',200,200,'chocolate',22);
newElem.createElement(); 

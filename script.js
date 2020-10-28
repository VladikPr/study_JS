document.addEventListener('DOMContentLoaded', function(){
    'use strict';

    class DomElement{
        constructor(selector, height, width, bg, fontSize, position = "static"){
            this.selector = selector;
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.position = position;
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
                font-size: ${this.fontSize}px;
                position: ${this.position};`;
            document.body.insertAdjacentElement("beforeend", element);
        }
    }


    /* const newElem = new DomElement('.newBlock',200,200,'chocolate',22);
    newElem.createElement();  */

    //Additional task
    const newElem1 = new DomElement('.square',100,100,'orange',16, 'absolute');
    newElem1.createElement(); 

    const elem = document.querySelector('.square');

    function moveObj(){
        let rightLeft = 0,
        upDown = 0;
        return function(e) {
            if(e.key === "ArrowUp" ){
                upDown-=10;
                elem.style.top = upDown + 'px';
            } else if(e.key === "ArrowRight"){
                rightLeft+=10;
                elem.style.left = rightLeft + 'px';
            }else if(e.key === "ArrowDown"){
                upDown+=10;
                elem.style.top = upDown + 'px';
            }else if(e.key === "ArrowLeft"){
                rightLeft-=10;
                elem.style.left = rightLeft + 'px';
            }
        }
          
    }

    let move = moveObj();

    document.body.addEventListener('keydown', (e) =>{
       move(e);
    });


    
});

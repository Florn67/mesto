class Section{
    constructor(renderer, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        this._renderer(items);
    }
    addItem(element, key = 'append'){
      if (key==='append'){
          this._container.append(element);
      }
      if (key==='prepend'){
          this._container.prepend(element);
      }
      }

}

export default Section
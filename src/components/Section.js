class Section{
    constructor({ items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(item => {
          this._renderer(item);
        });
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
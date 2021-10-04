class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }
  addItem(element, key = "append") {
    if (key === "append") {
      this._container.append(element);
    }
    if (key === "prepend") {
      this._container.prepend(element);
    }
  }
}

export default Section;

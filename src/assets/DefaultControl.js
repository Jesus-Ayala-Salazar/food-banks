/* default control for showing full width of map
*  implements mapbox-gl-js IControl class
*/
class DefaultControl {
  constructor(handleFunc) {
    this.eventListener = handleFunc;
  }
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('button');
    this._container.className = 'mapboxgl-ctrl';
    this._container.textContent = 'Default';
    this._container.addEventListener('click', this.eventListener);
    return this._container;
  }
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export {DefaultControl};
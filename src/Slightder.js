import { $, mount } from './utils/selector.js';

export default class Slightder {
  #coreModules = [];
  #modules;

  constructor(
    slightderEl,
    {
      loop = false,
      modules = null,
      speed = 300,
      spaceBetween = 0,
      slidesPerView = 1,
    }
  ) {
    this.#modules = modules
      ? this.#coreModules.concat(modules)
      : this.#coreModules;

    this.cnfg = {
      loop,
      speed,
      spaceBetween,
      slidesPerView,
    };
    this.slightderEl =
      typeof slightderEl === 'string' ? $(slightderEl) : slightderEl;

    this.slightderEl.classList.add(CSS_HORIZONTAL_SCROLL);
    this.wrapperEl = this.slightderEl.querySelector('.slightder__wrapper');
    this.slidesLength = this.wrapperEl.children.length;

    this.wrapperEl.style.setProperty(`--transition-duration`, `${speed}ms`);
    this.wrapperElWidth = this.wrapperEl.offsetWidth;

    this.xOffset = 0;

    mount.call(this, this.#modules);
  }
}

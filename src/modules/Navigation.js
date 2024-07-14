/**
 * Navigation module for the Slightder Component.
 *
 * This class handles the navigation buttons (prev/next) for the slider, providing
 * functionality to move between slides.
 *
 */

export default class Navigation {
  /**
   * The reference to the next & prev button element.
   * @type {HTMLElement}
   * @private
   */
  #prev;
  #next;
  #wrapperEl;
  #wrapperElWidth;
  #has_loop;
  #xOffset;
  #currentIndex;
  #MAX_INDEX;
  #MIN_INDEX;

  /**
   * Creates a new Navigation instance.
   *
   * @constructor
   * @param {Slightder} obj - The Slightder instance containing the main slider element and its children.
   * @param {HTMLElement} obj.slightderEl - The main slider element.
   * @param {Object} cnfg - The slider configuration object (optional).
   */

  constructor({
    slightderEl,
    wrapperEl,
    wrapperElWidth,
    xOffset,
    slidesLength,
    cnfg: { loop },
  }) {
    this.#prev = slightderEl.querySelector('.slightder__button-prev');
    this.#next = slightderEl.querySelector('.slightder__button-next');
    this.#wrapperEl = wrapperEl;
    this.#wrapperElWidth = wrapperElWidth;

    this.#xOffset = xOffset;
    this.#has_loop = loop;

    this.#currentIndex = 0;
    this.#MIN_INDEX = 0;
    this.#MAX_INDEX = slidesLength - 1;

    this.#initializeEvents();
  }

  #initializeEvents() {
    this.#next.addEventListener('click', this.#showNextSlide.bind(this));
    this.#prev.addEventListener('click', this.#showPrevSlide.bind(this));
  }

  #showNextSlide() {
    if (this.#currentIndex === this.#MAX_INDEX) {
      this.#currentIndex = this.#MIN_INDEX;
      this.#xOffset = 0;
      this.#wrapperEl.style.transform = `translate3d(${this.#xOffset}px,0,0)`;
      this.#currentIndex = 0;
      return;
    }
    this.#currentIndex++;
    this.#xOffset -= this.#wrapperElWidth;
    this.#wrapperEl.style.transform = `translate3d(${this.#xOffset}px,0,0)`;
  }

  #showPrevSlide() {
    if (this.#currentIndex === this.#MIN_INDEX) {
      this.#xOffset = -(this.#wrapperElWidth * this.#MAX_INDEX);
      this.#wrapperEl.style.transform = `translate3d(${this.#xOffset}px,0,0)`;
      this.#currentIndex = this.#MAX_INDEX;
      return;
    }
    this.#currentIndex--;
    this.#xOffset += this.#wrapperElWidth;
    this.#wrapperEl.style.transform = `translate3d(${this.#xOffset}px,0,0)`;
  }
}

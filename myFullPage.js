/*!
 * myFullPage.js v1.0.0
 * Simple fullpage scrolling sections (free alternative to fullPage.js)
 * Author: Your Name
 * License: MIT
 */

class MyFullPage {
  constructor(selector, options = {}) {
    // Default options
    this.options = Object.assign({
      speed: 800,
      loop: false,
      keyboard: true,
      onLeave: null,
      afterLoad: null
    }, options);

    // Container and sections
    this.container = document.querySelector(selector);
    if (!this.container) throw new Error("Container not found!");

    this.sections = this.container.querySelectorAll("section");
    this.index = 0;
    this.isAnimating = false;

    // Initial styles
    this.container.style.transition = `transform ${this.options.speed}ms ease-in-out`;

    // Bind events
    this.bindEvents();
  }

  bindEvents() {
    // Scroll with mouse
    window.addEventListener("wheel", (e) => {
      if (this.isAnimating) return;
      if (e.deltaY > 0) this.next();
      else this.prev();
    }, { passive: true });

    // Keyboard support
    if (this.options.keyboard) {
      window.addEventListener("keydown", (e) => {
        if (this.isAnimating) return;
        if (e.key === "ArrowDown") this.next();
        if (e.key === "ArrowUp") this.prev();
      });
    }
  }

  goTo(index) {
    if (index < 0) {
      if (this.options.loop) index = this.sections.length - 1;
      else return;
    }
    if (index >= this.sections.length) {
      if (this.options.loop) index = 0;
      else return;
    }

    if (typeof this.options.onLeave === "function") {
      this.options.onLeave(this.index, index);
    }

    this.index = index;
    this.isAnimating = true;

    this.container.style.transform = `translateY(-${this.index * 100}vh)`;

    setTimeout(() => {
      this.isAnimating = false;
      if (typeof this.options.afterLoad === "function") {
        this.options.afterLoad(this.index);
      }
    }, this.options.speed);
  }

  next() {
    this.goTo(this.index + 1);
  }

  prev() {
    this.goTo(this.index - 1);
  }
}

window.MyFullPage = MyFullPage;

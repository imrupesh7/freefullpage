class MyFullPage {
  constructor(options) {
    // Merge default options with user options
    this.options = Object.assign({
      sectionSelector: ".section",
      scrollSpeed: 700
    }, options);

    // Get sections
    this.sections = document.querySelectorAll(this.options.sectionSelector);
    this.currentSection = 0;
    this.isScrolling = false;

    if (!this.sections.length) {
      console.error("No sections found for selector:", this.options.sectionSelector);
      return;
    }

    // Set initial view
    this.scrollToSection(this.currentSection);

    // Add events
    this.addEvents();
  }

  addEvents() {
    // Mouse wheel
    window.addEventListener("wheel", (e) => this.handleScroll(e));

    // Keyboard navigation
    window.addEventListener("keydown", (e) => this.handleKeydown(e));

    // Touch navigation
    this.touchStartY = 0;
    window.addEventListener("touchstart", (e) => {
      this.touchStartY = e.touches[0].clientY;
    });
    window.addEventListener("touchend", (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = this.touchStartY - touchEndY;
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0 && this.currentSection < this.sections.length - 1) {
          this.currentSection++;
        } else if (diff < 0 && this.currentSection > 0) {
          this.currentSection--;
        }
        this.scrollToSection(this.currentSection);
      }
    });
  }

  handleScroll(e) {
    if (this.isScrolling) return;

    if (e.deltaY > 0 && this.currentSection < this.sections.length - 1) {
      this.currentSection++;
    } else if (e.deltaY < 0 && this.currentSection > 0) {
      this.currentSection--;
    }

    this.scrollToSection(this.currentSection);
  }

  handleKeydown(e) {
    if (this.isScrolling) return;

    if (e.key === "ArrowDown" && this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.scrollToSection(this.currentSection);
    } else if (e.key === "ArrowUp" && this.currentSection > 0) {
      this.currentSection--;
      this.scrollToSection(this.currentSection);
    }
  }

  scrollToSection(index) {
    if (!this.sections[index]) return;

    this.isScrolling = true;
    window.scrollTo({
      top: this.sections[index].offsetTop,
      behavior: "smooth"
    });

    // Unlock scrolling after delay
    setTimeout(() => {
      this.isScrolling = false;
    }, this.options.scrollSpeed);
  }
}

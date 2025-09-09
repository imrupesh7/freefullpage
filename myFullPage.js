class MyFullPage {
  constructor(options) {
    // Default options
    this.options = Object.assign({
      sectionSelector: ".section",
      scrollSpeed: 700
    }, options);

    // Get sections
    this.sections = document.querySelectorAll(this.options.sectionSelector);
    this.currentSection = 0;
    this.isScrolling = false;

    // Set initial view
    this.scrollToSection(this.currentSection);

    // Add scroll event
    window.addEventListener("wheel", (e) => this.handleScroll(e));
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

  scrollToSection(index) {
    this.isScrolling = true;
    window.scrollTo({
      top: this.sections[index].offsetTop,
      behavior: "smooth"
    });

    setTimeout(() => {
      this.isScrolling = false;
    }, this.options.scrollSpeed);
  }
}

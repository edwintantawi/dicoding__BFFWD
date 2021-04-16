class HeaderTop extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="headerTop">
      <h1>Food In Search</h1>
      <p>~ Find food, cook it yourself ~</p>
    </div>
    `;
  }
}
customElements.define("header-top", HeaderTop);
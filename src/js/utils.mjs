// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
  getLevelsDeep(parentElement);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}

function getLevelsDeep(element) {
  const levelDeep = location.pathname
    .split('/')
    .filter(part => part && part !== 'src').length - 1;
    adjustRelativePaths(element, levelDeep);
}

function adjustRelativePaths(container, levelsDeep) {
  const prefix = '../'.repeat(levelsDeep);
  container.querySelectorAll('img[data-src]').forEach(img => {
    img.src = prefix + img.getAttribute('data-src');
  });
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate(getTemplatePath("public/partials/header.html"));
  const header = document.querySelector("header");
  renderWithTemplate(headerTemplate, header);

  const footerTemplate = await loadTemplate(getTemplatePath("public/partials/footer.html"));
  const footer = document.querySelector("footer");
  renderWithTemplate(footerTemplate, footer);
}

function getTemplatePath(pathFromSrc) {
  const levelsDeep = location.pathname
    .split('/')
    .filter(part => part && part !== 'src').length - 1;

  const prefix = '../'.repeat(levelsDeep);
  return `${prefix}${pathFromSrc}`;
}
export function $(selector) {
  return document.querySelector(selector);
}

export function mount(Modules) {
  Modules.forEach((Module) => {
    new Module(this);
  });
}

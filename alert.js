/**
 * Renvoie un element HTML representant une alert
 * @param {string} message 
 * @returns {HTMLElement}
 */
export function alertElement(message){
  /** @type {HTMLElement} */
  const el = document.querySelector('#alert').content.firstElementChild.cloneNode(true);
  el.querySelector('.js-text').innerText = message;
  el.querySelector('button').addEventListener('click', e => {
    e.preventDefault();
    el.remove();
    el.dispatchEvent(new CustomEvent('close'));
  });
  return el;
}
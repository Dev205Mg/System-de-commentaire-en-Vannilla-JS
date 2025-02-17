import { fetchJSON } from "./functions/api.js";

class InfinitePagination {

  /**@type {string} */
  #endpoint;
  /**@type {HTMLTemplateElement} */
  #template;
  /**@type {HTMLElement} */
  #target;
  /**@type {object} */
  #elements;
  /**@type {IntersectionObserver} */
  #observer;
  /**@type {boolean} */
  #loading = false;

  /**
   * 
   * @param {HTMLElement} element 
   */
  constructor (element){
    this.#endpoint = element.dataset.endpoint;
    this.#template = document.querySelector(element.dataset.template);
    this.#target = document.querySelector(element.dataset.target);
    this.#elements = JSON.parse(element.dataset.elements);
    this.#observer = new IntersectionObserver((entries) => {
      for(const entrie of entries){
        if(entrie.isIntersecting){
          this.#loadMore();
        }
      }
    })
    this.#observer.observe(element);
  }


  async #loadMore(){
    if(this.#loading){
      return;
    }
    this.#loading = true;
    const commnets = await fetchJSON(this.#endpoint);
    for(const comment of commnets){
      const commentElement = this.#template.content.cloneNode(true);
      for(const [key, selector] of Object.entries(this.#elements)){
        commentElement.querySelector(selector).innerText = comment[key];
      }
      this.#target.append(commentElement);
    }
    this.#loading = false;
  }


}

document
  .querySelectorAll('.js-infinite-pagination')
  .forEach( el => new InfinitePagination(el));
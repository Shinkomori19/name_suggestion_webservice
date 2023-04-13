/**
 * Name: Shin Komori
 * Date: November 18, 2022
 *
 * This is the JS to implement the UI for client side of my webservice,
 * which is a combination of the server side and the client side.
 * It makes possible for users to interact with serverside through user
 * interface. They can either get a hamster name from the data in server
 * by making a GET request, or add a name to the server side data by
 * making a POST request.
 */

'use strict';

(function () {
  const BASE_URL = 'http://localhost:8000/';
  window.addEventListener('load', init);

  /**
   *  This is the function which is executed when load event is fired.
   */
  function init() {
    qs('button').addEventListener('click', makeRequest);
    qs('form').addEventListener('submit', function (evt) {
      evt.preventDefault();
      addName();
    });
  }

  /**
   * Makes a request to API. Checks ok code, and change json to javascript
   * object. processData manipulates returned data. handleError handles errors when
   * a promise is rejected.
   */
  function makeRequest() {
    let url = BASE_URL + 'choose';
    fetch(url)
      .then(statusCheck)
      .then((resp) => resp.text())
      .then(processData)
      .catch(handleGetError);
  }

  /**
   * Makes a post request to add an name to arrays that server side stores.
   * Shows feedback depending on the response of server. Calls handlePostError
   * as the error handling functon.
   */
  function addName() {
    let url = BASE_URL + 'add';
    let params = new FormData(qs('form'));
    fetch(url, { method: 'POST', body: params })
      .then(statusCheck)
      .then((resp) => resp.json())
      .then(afterAdding)
      .catch((err) => {
        handlePostError(err);
      });
  }

  /**
   * This is the function to manipulate returned data from API.
   * Takes returned names from API and displays it in the page.
   * @param {string} resp text data returned from API
   */
  function processData(resp) {
    let errImg = qs('Img');
    errImg.classList.add('hidden');

    let name = gen('p');
    name.textContent = resp;

    changeContent('name-container', name);
    clearText('feedback');
  }

  /**
   * Implements the process after making a POST request to add a name to
   * data stored in server.
   * Checks the result key of an object returned from API, and see if the name
   * was added or not. Shows message depending on the result.
   * @param {object} resp object response data from API
   */
  function afterAdding(resp) {
    let errImg = qs('Img');
    errImg.classList.add('hidden');

    let feedback = gen('p');
    const names = resp['names'];
    if (resp['result'] === 1) {
      feedback.textContent =
        'New name was added to data: ' +
        names[names.length - 1] +
        'Thank you for your help!! ' +
        resp['count'] +
        'names were added thanks to users';
    } else {
      feedback.textContent =
        'This name already exists. Please think of new one.';
    }

    changeContent('feedback', feedback);
    clearText('name-container');
  }

  /**
   * This function is called if a promise is rejected in the .then chain starting
   * from fetch request. It displays a GIF to the website and shows descriptive
   * message below the GIF.
   */
  function handleGetError() {
    let errImg = qs('Img');
    errImg.classList.remove('hidden');

    let errMessage = gen('p');
    errMessage.textContent = 'Something went wrong. Please wait and try again.';

    changeContent('name-container', errMessage);
  }

  /**
   * Handles error when POST request failed. Shows the error image and displays
   * a descriptive error message on the screen.
   * @param {string} err error message returned by API
   */
  function handlePostError(err) {
    let errImg = qs('Img');
    errImg.classList.remove('hidden');

    let errMessage = gen('p');
    errMessage.textContent = err;

    changeContent('feedback', errMessage);
    clearText('name-container');
  }

  /**
   * Resets the content, and appends the given HTML element as a child to the
   * element with given id.
   * @param {stirng} givenId id of a given element.
   * @param {HTMLElement} elem HTML element which is to be added.
   */
  function changeContent(givenId, elem) {
    let target = id(givenId);
    target.innerHTML = '';
    target.appendChild(elem);
  }

  /**
   * Checks the status code is in the range of ok, and see if a returned object
   * from fetch has appropriate data.
   * @param {object} res object that is returned from fetch.
   * @returns {object} res if ok, throws error if not
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Utility function. Clears text content of the element of given id.
   * @param {string} givenId id of the desired element.
   */
  function clearText(givenId) {
    let target = id(givenId);
    target.innerHTML = '';
  }

  /**
   * Utility function. Gets an element using id.
   * @param {string} id takes id as str.
   * @returns {HTMLElement} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Utility function. Gets an element using selector.
   * @param {string} selector CSS selecgtor of desired object.
   * @returns {HTMLElement} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Utility function. Generates an <tagName> element.
   * @param {string} tagName HTML element to be created.
   * @returns {HTMLElement} newly created DOM object of <tagName>.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();

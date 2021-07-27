const { getReactRoot, getReactIframeElement } = require('./utils');

/**
 * wait for react to be loaded
 * @param {*} timeout
 * @param {*} reactRoot
 */
exports.waitForReact = (timeout = 10000, reactRoot) => {
  const file = require.hasOwnProperty('resolve')
    ? require.resolve('enhanced-resq')
    : 'node_modules/enhanced-resq/dist/index.js';

  cy.readFile(file, 'utf8', {
    log: false,
  }).then((script) => {
    cy.window({ log: false }).then({ timeout: timeout }, (win) => {
      win.eval(script);
      return new Cypress.Promise.resolve(
        win.enhanced-resq.waitToLoadReact(timeout, getReactRoot(reactRoot))
      )
        .then(() => {
          cy.log('[cypress-react-selector] loaded');
        })
        .catch((err) => {
          throw new Error(
            `[cypress-react-selector] root found as ${reactRoot}. It is not valid root for your application. \n
              > Make sure to declare root selector as a configuration [recommended]\n
              > or Pass as a parameter to waitForReact() method`
          );
        });
    });
  });
};

/**
 * wait for react to be loaded
 * @param {*} timeout
 * @param iframeElSelector
 * @param reactRoot
 */
exports.waitForReactIframe = (timeout = 10000, iframeElSelector, reactRoot) => {
  const file = require.hasOwnProperty('resolve')
    ? require.resolve('enhanced-resq')
    : 'node_modules/enhanced-resq/dist/index.js';

  cy.readFile(file, 'utf8', {
    log: false,
  }).then((script) => {
    cy.window({ log: false }).then({ timeout: timeout }, (win) => {
      win.eval(script);
      return new Cypress.Promise.resolve(
        win.enhanced-resq.waitToLoadReactInIframe(timeout, getReactIframeElement(iframeElSelector), getReactRoot(reactRoot))
      )
        .then(() => {
          cy.log('[cypress-react-selector] loaded');
        })
        .catch((err) => {
          throw new Error(
            `[cypress-react-selector] root found as ${reactRoot} within ${iframeElSelector}. It is not valid root for your application. \n
              > Make sure to declare root selector as a configuration [recommended]\n
              > or Pass as a parameter to waitForReact() method`
          );
        });
    });
  });
};


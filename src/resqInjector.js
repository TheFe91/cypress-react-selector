/**
 * wait for react to be loaded
 * @param {*} timeout
 */
exports.waitForReactPlayerWeb = (timeout = 10000) => {
  const file = require.hasOwnProperty('resolve')
    ? require.resolve('resq')
    : 'node_modules/resq/dist/index.js';

  cy.readFile(file, 'utf8', {
    log: false,
  }).then((script) => {
    cy.window({ log: false }).then({ timeout: timeout }, (win) => {
      win.eval(script);
      return new Cypress.Promise.resolve(
        win.resq.waitToLoadReactPlayerWeb(timeout)
      )
        .then(() => {
          cy.log('[cypress-react-selector] loaded');
        })
        .catch((err) => {
          throw new Error(
            `[cypress-react-selector]. It is not valid root for your application. \n
              > Make sure to declare root selector as a configuration [recommended]\n
              > or Pass as a parameter to waitForReact() method`
          );
        });
    });
  });
};

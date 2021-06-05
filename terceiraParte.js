/*
Funcionalidade: Verifica a autenticação necessária para criar questões
Cenário: Verifica se ao tentar criar uma questão nova o usuário recebe a mensagem de que precisa estar logado
Dado que navego para a homepage
E clico no botão 'Add new questions' no meio da pagina
Entao visualizo uma mensagem de erro indicando que o usuário deve logar antes
Quando clico no botão 'Add new questions' no topo da pagina
Entao visualizo uma mensagem de erro indicando que o usuário deve logar antes
*/

const { remote } = require("webdriverio");
const browserUrl = "https://opentdb.com/";

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

// Cenário: Verifica se ao tentar criar uma questão nova o usuário recebe a mensagem de que precisa estar logado
(async () => {
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
  });
  try {
    // Dado que navego para a homepage
    await browser.url(browserUrl);

    // E clico no botão 'Add new questions' no meio da pagina
    const addNewQuestionsButtonOnMiddleOfThePage = await browser.$(
      "//a[normalize-space()='ADD NEW QUESTIONS']"
    );
    await addNewQuestionsButtonOnMiddleOfThePage.click();

    // Entao visualizo uma mensagem de erro indicando que o usuário deve logar antes
    let errorMessage = await browser.$("//div[@class='alert alert-danger']");

    // Quando clico no botão 'Add new questions' no topo da pagina
    await browser.url(browserUrl);
    const addNewQuestionsButtonOnTopOfThePage = await browser.$(
      "//a[normalize-space()='Add New Questions']"
    );
    await addNewQuestionsButtonOnTopOfThePage.click();

    // Entao visualizo uma mensagem de erro indicando que o usuário deve logar antes    const queryField = await browser.$("//input[@name='query']");
    errorMessage = await browser.$("//div[@class='alert alert-danger']");

    console.log("Tests passed!");
  } catch (error) {
    console.log(`Tests failed with error: ${error}.`);
  }
})();

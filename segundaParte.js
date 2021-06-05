/*
Funcionalidade: Busca no Banco de Questões
Cenário: Verifica se a listagem de questões tem 25 itens e se o controle de paginação aparece
Dado que navego para a página de busca do banco de questões
E digito 'a' no campo de busca
Quando clico no botão de buscar
Então visualizo 25 itens na table e o controle de paginação
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

// Cenário: Verifica se a listagem de questões tem 25 itens e se o controle de paginação aparece
(async () => {
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
  });
  try {
    // Dado que navego para a página de busca do banco de questões
    await browser.url(browserUrl);
    const browseButton = await browser.$("//a[normalize-space()='BROWSE']");
    await browseButton.click();

    // E digito 'a' no campo de busca
    const queryField = await browser.$("//input[@name='query']");
    await queryField.setValue("a");

    // Quando clico no botão de buscar
    const searchButton = await browser.$(
      "//button[normalize-space()='Search']"
    );
    await searchButton.click();

    // Então visualizo 25 itens na table e o controle de paginação
    const paginationControls = await browser.$(
      "//ul[@class='pagination pagination-lg']"
    );

    const tableRows = await browser.$$("//table/tbody//tr");
    if (tableRows.length !== 25)
      throw "A listagem de questões não possui 25 itens";

    console.log("Tests passed!");
  } catch (error) {
    console.log(`Tests failed with error: ${error}.`);
  }
})();

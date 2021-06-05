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

// Cenário: Busca por questão inexistente
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

    // E digito 'Science: Computers' no campo de busca
    const queryField = await browser.$("//input[@name='query']");
    await queryField.setValue("Science: Computers");

    // Quando clico no botão de buscar
    const searchButton = await browser.$(
      "//button[normalize-space()='Search']"
    );
    await searchButton.click();

    // Então visualizo uma mensagem de erro com o texto 'No questions found.'
    const errorMessage = await browser.$(
      "//div[normalize-space()='No questions found.']"
    );

    console.log("Tests passed!");
  } catch (error) {
    console.log(`Tests failed with error: ${error}.`);
  }
})();

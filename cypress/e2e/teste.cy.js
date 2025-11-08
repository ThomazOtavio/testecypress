it('upload imagem cypress', () => {
    cy.readFile('cypress/fixtures/Sirius.png', 'binary').then((file) => {
        cy.window().then((win) =>{
            const blob = Cypress.Blob.binaryStringToBlob(file, 'image/jpg')
            const formData = new win.FormData();
            formData.append('files', blob, 'Sirius.png')
            formData.append('file_name', Cypress.env('pdf_teste_thomaz'))
            cy.request({
                method: 'POST',
                url: Cypress.env('url'),
                body: formData,
                headers: {'ContentType': 'multipart/form-data',
                    'email':Cypress.env('email')
                }
            }).then((resp) => {
                expect(resp.status) .to.eq(200)
            })
        })
    })
})

it('valida o email na resposta da API', () => {
    cy.visit(Cypress.env('yopmail'));
    cy.get('body').then(($body) => {
      const $btn = $body.find('[aria-label="Consent"]');
      if ($btn.length && $btn.is(':visible')) {
        cy.wrap($btn).click({ force: true });
      }
    });
    cy.get('[class="ycptinput"]').type(Cypress.env('email'))
    cy.get('[id="refreshbut"]').click();
    cy.get('iframe#ifmail', { timeout: 15000 }).should('exist').then(($iframe) => {
      const body = $iframe.contents().find('body');
      cy.wrap(body)
        .find('a[title*="'+Cypress.env('pdf_teste_thomaz')+'"]', { timeout: 10000 })
        .should('be.visible');
    });
  });
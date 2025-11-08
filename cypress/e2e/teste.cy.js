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
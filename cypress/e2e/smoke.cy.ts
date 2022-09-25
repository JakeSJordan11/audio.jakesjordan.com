it("should play audio", () => {
  cy.visit("/");
  cy.get("audio").then((audio) => {
    audio[0].play();
    cy.wait(5000);
  });
});

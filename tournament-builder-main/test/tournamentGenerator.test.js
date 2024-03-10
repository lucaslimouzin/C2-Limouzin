import TournamentGenerator from '../src/tournamentGenerator.js';

function testGeneratePoules() {
  console.log("Test: Generate Poules");

  // Préparation
  const teams = new Array(16).fill(null).map((_, index) => ({ name: `Team ${index + 1}`, players: [] }));
  const tournament = new TournamentGenerator(teams);

  // Action
  tournament.generatePoules();

  // Vérification
  const expectedPoulesCount = 4;
  if (tournament.poules.length !== expectedPoulesCount) {
    console.error(`Échec du test : Le nombre de poules attendu était de ${expectedPoulesCount}, mais a reçu ${tournament.poules.length}.`);
    return;
  }

  let allTeamsAssigned = tournament.poules.flat().length === teams.length;
  if (!allTeamsAssigned) {
    console.error(`Échec du test : Toutes les équipes n'ont pas été assignées aux poules.`);
    return;
  }

  console.log("Succès du test : La génération de poules fonctionne correctement.");
}

// Exécuter le test
testGeneratePoules();

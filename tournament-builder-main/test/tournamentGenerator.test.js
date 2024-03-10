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

function testSimulatePoulesMatches() {
    console.log("Test: Simulate Poules Matches");

    // Préparation
    const teams = new Array(8).fill(null).map((_, index) => ({ name: `Team ${index + 1}`, players: [] }));
    const tournament = new TournamentGenerator(teams);
    tournament.generatePoules();
    tournament.simulatePoulesMatches();

    // Vérification que chaque poule a généré deux équipes qualifiées
    let allPoulesHaveTwoQualifiedTeams = tournament.poules.every(poule => poule.length === 4) && tournament.finalStages[0].length === tournament.poules.length * 2;
    if (!allPoulesHaveTwoQualifiedTeams) {
        console.error("Échec du test : Chaque poule n'a pas généré deux équipes qualifiées.");
        return;
    }

    // Vérification de la cohérence des équipes qualifiées
    let qualifiedTeamsAreFromPoules = tournament.finalStages[0].every(team => 
        tournament.poules.flat().some(pouleTeam => pouleTeam.name === team.name));
    if (!qualifiedTeamsAreFromPoules) {
        console.error("Échec du test : Les équipes qualifiées ne proviennent pas des poules.");
        return;
    }

    console.log("Succès du test : La simulation des matchs de poules fonctionne correctement.");
}

// Exécuter le test
testSimulatePoulesMatches();

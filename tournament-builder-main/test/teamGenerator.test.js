import TeamGenerator from '../src/teamGenerator.js'; 

function testGenerateTeams() {
    console.log("Test: Generate Teams");

    // Préparation
    const totalPlayers = 15; 
    const playersPerTeam = 3;
    const players = new Array(totalPlayers).fill(null).map((_, index) => `Player ${index + 1}`);
    const teamGenerator = new TeamGenerator(players, playersPerTeam);

    // Action
    teamGenerator.generateTeams();
    const teams = teamGenerator.getTeams();

    // Vérification du nombre d'équipes
    const expectedTeamsCount = Math.ceil(totalPlayers / playersPerTeam);
    if (teams.length !== expectedTeamsCount) {
        console.error(`Échec du test : Le nombre d'équipes attendu était de ${expectedTeamsCount}, mais a reçu ${teams.length}.`);
        return;
    }

    // Vérification de la distribution des joueurs
    const isDistributionCorrect = teams.every((team, index) => {
        if (index === teams.length - 1) {
            return team.players.length <= playersPerTeam;
        }
        return team.players.length === playersPerTeam;
    });
    if (!isDistributionCorrect) {
        console.error("Échec du test : La distribution des joueurs par équipe est incorrecte.");
        return;
    }

    console.log("Succès du test : La génération d'équipes fonctionne correctement.");
}

// Exécuter le test
testGenerateTeams();

//test TDD
// Test pour vérifier que chaque équipe a un nombre équitable de joueurs
function testFairDistributionOfPlayers() {
  console.log("Test: Fair Distribution Of Players");

  // Préparation
  const players = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
  const playersPerTeam = 3; // Vous avez 8 joueurs et vous voulez 3 joueurs par équipe.
  const teamGenerator = new TeamGenerator(players, playersPerTeam);

  // Action
  teamGenerator.generateTeams();
  const teams = teamGenerator.getTeams();

  // Vérification
  // Vous attendez 2 équipes pleines et une équipe avec 2 joueurs (8 joueurs au total, 3 par équipe).
  const expectedFullTeamsCount = Math.floor(players.length / playersPerTeam);
  const expectedPlayersInLastTeam = players.length % playersPerTeam;

  let isFairDistribution = teams.every((team, index) => {
    // Pour toutes les équipes sauf la dernière
    if (index < expectedFullTeamsCount) {
      return team.players.length === playersPerTeam;
    }
    // Pour la dernière équipe
    return team.players.length === expectedPlayersInLastTeam;
  });

  if (!isFairDistribution) {
    throw new Error("Échec du test : La répartition des joueurs n'est pas équitable.");
  }

  console.log("Succès du test : Les joueurs sont répartis équitablement en équipes.");
}


// Exécuter le test
testFairDistributionOfPlayers();

//tdd
//nouvelle fonctionnalité
// teamGenerator.test.js

// Test pour vérifier que chaque équipe a un capitaine désigné
function testTeamHasACaptain() {
  console.log("Test: chaque équipe a un capitaine");

  // Préparation
  const players = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
  const playersPerTeam = 3;
  const teamGenerator = new TeamGenerator(players, playersPerTeam);

  // Action
  teamGenerator.generateTeams();
  teamGenerator.assignCaptains(); 
  const teams = teamGenerator.getTeams();

  // Vérification
  let everyTeamHasACaptain = teams.every(team => team.captain !== undefined);

  if (!everyTeamHasACaptain) {
    throw new Error("Échec du test : Pas toutes les équipes ont un capitaine.");
  }

  console.log("Succès du test : Chaque équipe a un capitaine désigné.");
}

// Exécuter le test
testTeamHasACaptain();

// Test pour vérifier que le capitaine est un membre de l'équipe
function testCaptainIsAMemberOfTheTeam() {
  console.log("Test: Le capitaine est un membre de l'équipe");

  // Préparation
  const players = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
  const playersPerTeam = 3;
  const teamGenerator = new TeamGenerator(players, playersPerTeam);

  // Action
  teamGenerator.generateTeams();
  teamGenerator.assignCaptains();
  const teams = teamGenerator.getTeams();

  // Vérification
  let captainIsMemberOfTeam = teams.every(team => team.players.includes(team.captain));

  if (!captainIsMemberOfTeam) {
    throw new Error("Échec du test : Le capitaine n'est pas un membre de son équipe.");
  }

  console.log("Succès du test : Chaque capitaine est un membre de son équipe.");
}

// Exécuter le test
testCaptainIsAMemberOfTheTeam();

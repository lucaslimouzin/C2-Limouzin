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

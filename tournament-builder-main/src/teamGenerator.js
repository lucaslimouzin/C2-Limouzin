class TeamGenerator {
  constructor(players, playersPerTeam = 3) {
    this.players = players;
    this.playersPerTeam = playersPerTeam;
    this.teams = [];
  }

   generateTeams() {
    let shuffledPlayers = [...this.players].sort(() => 0.5 - Math.random());
    let playersRemaining = shuffledPlayers.length;

    while (playersRemaining > 0) {
      let teamSize = this.playersPerTeam;
      
      // Si le nombre restant de joueurs est suffisant pour au moins une demi-équipe mais moins qu'une équipe complète,
      // ajustez la taille de la dernière équipe pour inclure tous les joueurs restants.
      if (playersRemaining < this.playersPerTeam && playersRemaining >= Math.ceil(this.playersPerTeam / 2)) {
        teamSize = playersRemaining;
      } else if (playersRemaining < Math.ceil(this.playersPerTeam / 2)) {
        // Si moins de la moitié de 'playersPerTeam' reste, ajoutez-les à la dernière équipe créée.
        this.teams[this.teams.length - 1].players.push(...shuffledPlayers);
        break;
      }
      
      let teamPlayers = shuffledPlayers.splice(0, teamSize);
      let teamName = `Équipe ${this.teams.length + 1}`;
      let team = {
        name: teamName,
        players: teamPlayers,
      };
      this.teams.push(team);
      playersRemaining -= teamSize;
    }
  }

  getTeams() {
    return this.teams;
  }

  //nouvelle fonctionnalité
  assignCaptains() {
    this.teams.forEach(team => {
      const randomIndex = Math.floor(Math.random() * team.players.length);
      team.captain = team.players[randomIndex];
    });
  }
}

export default  TeamGenerator
// Exemple d'utilisation


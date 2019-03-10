// generates a tournament bracket as a heap 
// should work with any number of teams
// currently works with powers of 2
class Tournament {
  constructor(teams) {
    this.games = [];
    let num_rounds = Math.ceil(Math.log2(teams.length));
    let team_index = 0;
    for(let round=1; round<=num_rounds; round++) {
      let num_games = 2 ** (round-1);
      for(let game=0; game<num_games; game++) {
        let t1 = false;
        let t2 = false;
        let game_id = this.games.length;
        if(round === num_rounds) {
          t1 = teams[team_index++];
          t2 = teams[team_index++];
        }
        this.games.push({id: game_id, round: round, team1: t1, team2: t2, winner: null});
      }
    }
  }
}

export default Tournament;
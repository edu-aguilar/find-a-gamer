import { GamesAccess } from './../datalayer/gamesAccess'

const gamesAccess = new GamesAccess()

export async function getGames() {
  
  return gamesAccess.getGames()
}
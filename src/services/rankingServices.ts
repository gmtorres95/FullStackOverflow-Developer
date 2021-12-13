import * as rankingRepository from '../repositories/rankingRepository';

export async function listRaking() {
  return rankingRepository.listRanking();
}

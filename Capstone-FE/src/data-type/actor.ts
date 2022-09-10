import actorInterface from "./actor.interface"

export class ActorInfo implements actorInterface {
  id!: number;
  name!: string;
  age!: string;
  gender!: string;
  movieId!: number;
  actorObject:actorInterface
  constructor (actorInfo:actorInterface) {
    this.actorObject = actorInfo
  }
}

export class EmailAlreadyRegistered extends Error {
  constructor() {
    super('Oops. Looks like your this e-mail already exists.')
  }
}

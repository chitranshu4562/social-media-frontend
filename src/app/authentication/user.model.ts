export class User {
  constructor(
    public id: number,
    public email: string,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }

}

export class User {
  constructor(
    public id: number,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public firstName: string,
    public lastName?: string,
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}

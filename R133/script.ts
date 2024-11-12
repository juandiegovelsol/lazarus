class SocialMediaAPI {
  private _userData: any | null = null;
  constructor(private userId: string) {}
  private async fetchUserData(): Promise<any> {
    // Simulated API call to fetch user data
    console.log("Fetching user data from API...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: this.userId, name: "John Doe", followers: 1200 });
      }, 1000);
    });
  }
  public async getUserData(): Promise<any> {
    if (this._userData === null) {
      this._userData = await this.fetchUserData();
    }
    return this._userData;
  }
}
(async () => {
  const api = new SocialMediaAPI("user123");
  console.log(await api.getUserData()); // Fetches data on the first call
  console.log(await api.getUserData()); // Returns cached data on subsequent calls
})();

class Token {
    private static _accessToken: string = '';
  
    // Getter for the access token
    static get accessToken(): string {
      return Token._accessToken;
    }
  
    // Setter for the access token
    static set accessToken(value: string) {
      Token._accessToken = value;
    }
  }
  
  export default Token;
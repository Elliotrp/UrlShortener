export class Url {
   public id?: number;
   public shortUrl?: string;
   public targetUrl?: string;
   public password?: boolean;
   public createdDate?: string;

   constructor(id?: number, shortUrl?: string, targetUrl?: string, password?: boolean, createdDate?: string) {
      this.id = id;
      this.shortUrl = shortUrl;
      this.targetUrl = targetUrl;
      this.password = password;
      this.createdDate = createdDate;
   }
}

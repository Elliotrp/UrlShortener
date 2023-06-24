export class Url {
   public id?: number;
   public shortUrl?: string;
   public targetUrl?: string;

   constructor(id?: number, shortUrl?: string, targetUrl?: string) {
      this.id = id;
      this.shortUrl = shortUrl;
      this.targetUrl = targetUrl;
   }
}

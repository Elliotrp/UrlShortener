export function validateUrl(value: string | undefined): boolean {
   if (value) {
      return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value);
   }

   return false;
}

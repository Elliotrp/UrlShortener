export interface IChoroplethData {
   count: number;
   relativeCount: number;
}

export class ChoroplethDataMap extends Map<string, IChoroplethData> {
   getItemById(id: string | number | undefined): IChoroplethData | undefined {
      return id === undefined ? undefined : this.get(id.toString());
    }
}
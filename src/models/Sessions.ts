export class Sessions {
  /**
   * Session keys are used dynamically throughout the app (e.g. "fp1", "qualifying").
   * The JSON data stores timestamps as strings, and we treat them as such at the edges.
   */
  [key: string]: any;

  fp1: Date;
  fp2: Date;
  fp3: Date;
  sprint: Date;
  qualifying: Date;
  gp: Date;
  practice1: Date;
  practice2: Date;
  race: Date;
  warmup: Date;
}
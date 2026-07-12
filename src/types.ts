export type Level = 1 | 2 | 3;

export interface Question {
  id: string;
  level: Level;
  levelName: string;
  text: string;
}

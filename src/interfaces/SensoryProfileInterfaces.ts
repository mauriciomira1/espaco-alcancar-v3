export interface SensoryProfileResponseInterface {
  id: string;
  childName: string;
  childId: string;
  profileType: "UNTIL_THREE_YEARS" | string;
  status: "UNFILLED" | "STARTED" | "FINISHED";
  createdAt: string; // Pode ser Date se preferir
  updatedAt: string;
  resultsOfSensoryProfile: string;
}

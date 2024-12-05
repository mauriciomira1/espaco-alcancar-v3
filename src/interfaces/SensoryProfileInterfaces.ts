export interface SensoryProfileResponseInterface {
  id: string;
  childName: string;
  profileType: "UNTIL_THREE_YEARS" | string;
  status: "FINISHED" | string;
  createdAt: string; // Pode ser Date se preferir
  updatedAt: string;
  resultsOfSensoryProfile: string;
}

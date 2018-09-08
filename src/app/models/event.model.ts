

export class EventInfoModel {
  id: number;
  title: string;
  description: string;
  date: Date = new Date();
  abonement = false;
  price: number;
  type = 1;
}

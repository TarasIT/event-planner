export interface NewEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  priority: string;
  [key: string]: string;
}

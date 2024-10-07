export interface NewEvent {
  id?: string | undefined;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  category?: string;
  picture?: string | File | Blob;
  priority?: string;
  [key: string]: string | File | Blob | undefined;
}

export interface User {
  name?: string;
  email: string;
  password: string | null;
}

export interface EventsLinks {
  first: string;
  last: string;
  next: string;
}

export interface PageLinks {
  active: boolean;
  label: string;
  url: string | null;
}

export interface EventsMeta {
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  per_page: number;
  total: number;
  links: PageLinks[];
}

export interface EventsProps {
  data: NewEvent[];
  meta: EventsMeta;
  links: EventsLinks;
}

export interface ChangePassworProps {
  current_password?: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ResetPassworProps {
  email?: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponseProps {
  message?: string;
  error?: string;
  token?: string;
}

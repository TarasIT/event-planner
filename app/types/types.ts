export interface NewEvent {
  id?: string | undefined;
  title: string | null;
  description?: string | null;
  date: string | null;
  time: string | null;
  location?: string | null;
  category?: string | null;
  picture?: string | File | Blob | null;
  priority?: string | null;
  [key: string]: string | File | Blob | null | undefined;
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

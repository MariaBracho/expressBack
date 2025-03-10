export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  isblocked?: boolean;
  createdAt?: Date;
}

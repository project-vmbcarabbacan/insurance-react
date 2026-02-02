export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
};
export type CustomerStatus = 'Lead' | 'Prospect' | 'Customer' | 'Churned';
export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  lastContact: string;
  phone?: string;
  avatar?: string;
};
export type DealStage = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export type Deal = {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  probability: number;
  ownerId: string;
  customerId: string;
  lastActivity: string;
};
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  customerId: string;
  assigneeId?: string;
  createdAt: string;
  slaDue: string;
};
export type ActivityType = 'email' | 'call' | 'meeting' | 'note';
export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  userId: string;
  customerId?: string;
};
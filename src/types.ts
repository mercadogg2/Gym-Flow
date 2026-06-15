/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logoType: 'icon' | 'text' | 'image';
  logoText?: string;
  primaryColor: string; // Tailwind hex or class name
  secondaryColor: string;
  activeModules: {
    leads: boolean;
    relatorios: boolean;
    campanhas: boolean;
    autonacoes: boolean;
    equipe: boolean;
    checkins: boolean;
    financeiro: boolean;
  };
  address: string;
  phone: string;
  email: string;
}

export interface Student {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  status: 'Ativo' | 'Inativo' | 'Em Risco' | 'Pendente';
  planId: string;
  registrationDate: string;
  nextBillingDate: string;
  attendanceRate: number; // Percentage
  totalCheckins: number;
}

export interface Lead {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  status: 'Novo' | 'Contato' | 'Visita' | 'Matriculado' | 'Perdido';
  source: 'Instagram' | 'Indicação' | 'Google' | 'Site' | 'WhatsApp Direct';
  date: string;
  notes: string;
}

export interface Plan {
  id: string;
  tenantId: string;
  name: string;
  price: number;
  period: 'Mensal' | 'Trimestral' | 'Semestral' | 'Anual';
  activeStudents: number;
  features: string[];
}

export interface FitnessClass {
  id: string;
  tenantId: string;
  name: string; // e.g., 'Crossfit', 'Spinning', 'Pilates'
  instructor: string;
  time: string;
  days: string[]; // e.g., ['Seg', 'Qua', 'Sex']
  capacity: number;
  enrolled: number;
  category: 'Cardio' | 'Força' | 'Flexibilidade' | 'Funcional';
}

export interface Booking {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  time: string;
  status: 'Check-in Realizado' | 'Agendado' | 'Cancelado';
}

export interface Payment {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  method: 'Pix' | 'Cartão' | 'Boleto' | 'Dinheiro' | '-';
}

export interface TeamMember {
  id: string;
  tenantId: string;
  name: string;
  role: 'Dono' | 'Recepcionista' | 'Professor';
  email: string;
  phone: string;
  avatarUrl: string;
  active: boolean;
}

export interface MarketingCampaign {
  id: string;
  tenantId: string;
  name: string;
  channel: 'WhatsApp' | 'E-mail' | 'Push';
  triggerType: 'Inadimplência' | 'Ausência +7 dias' | 'Aniversário' | 'Boas-vindas' | 'Manual';
  templateText: string;
  status: 'Ativo' | 'Pausado';
  sentCount: number;
  conversionCount: number;
}

export interface AppState {
  tenants: Tenant[];
  currentTenantId: string;
  students: Student[];
  leads: Lead[];
  plans: Plan[];
  classes: FitnessClass[];
  bookings: Booking[];
  payments: Payment[];
  team: TeamMember[];
  campaigns: MarketingCampaign[];
}

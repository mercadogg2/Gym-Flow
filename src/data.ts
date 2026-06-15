/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState, Tenant, Student, Lead, Plan, FitnessClass, Booking, Payment, TeamMember, MarketingCampaign } from './types';

// Seed Tenants - Professional, Brazilian premium white-label brands
const initialTenants: Tenant[] = [
  {
    id: 'iron-gym',
    name: 'Vortex Club - Unidade Jardins',
    domain: 'vortexjardins.gymflow.com.br',
    logoType: 'text',
    logoText: 'VORTEX CLUB',
    primaryColor: '#BEF264', // Clean Minimalism Lime
    secondaryColor: '#121212', // Deep Zinc Dark
    activeModules: {
      leads: true,
      relatorios: true,
      campanhas: true,
      autonacoes: true,
      equipe: true,
      checkins: true,
      financeiro: true,
    },
    address: 'Alameda Lorena, 1500 - Jardins, São Paulo - SP',
    phone: '(11) 98888-7777',
    email: 'contato@vortexclub.com.br'
  },
  {
    id: 'zen-yoga',
    name: 'Zen Yoga Studio',
    domain: 'zenyoga.gymflow.com.br',
    logoType: 'text',
    logoText: 'ZEN YOGA',
    primaryColor: '#0d9488', // Teal
    secondaryColor: '#f0fdfa', // Teal light
    activeModules: {
      leads: true,
      relatorios: true,
      campanhas: false,
      autonacoes: true,
      equipe: true,
      checkins: true,
      financeiro: true,
    },
    address: 'Alameda Lorena, 450 - Jardins, São Paulo',
    phone: '(11) 97777-6666',
    email: 'aloha@zenyoga.com.br'
  },
  {
    id: 'fit-fight',
    name: 'Fit & Fight Arena',
    domain: 'fitfight.gymflow.com.br',
    logoType: 'text',
    logoText: 'FIT FIGHT',
    primaryColor: '#8b5cf6', // Violet
    secondaryColor: '#1e1b4b', // Indigo dark
    activeModules: {
      leads: true,
      relatorios: true,
      campanhas: true,
      autonacoes: false,
      equipe: false,
      checkins: true,
      financeiro: false,
    },
    address: 'Rua dos Pinheiros, 789 - Pinheiros, SP',
    phone: '(11) 96666-5555',
    email: 'recepcao@fitfight.com.br'
  }
];

// Seed Plans - Realigned with Brazilian high-performance gym metrics
const initialPlans: Plan[] = [
  // Vortex Arena Club plans
  { 
    id: 'iron-silver', 
    tenantId: 'iron-gym', 
    name: 'Plano Silver Mensal (Recorrente)', 
    price: 159.90, 
    period: 'Mensal', 
    activeStudents: 145, 
    features: ['Musculação Completa', 'Área de Cardio de Alta Performance', 'Aplicativo Interativo do Aluno', 'Suporte receptivo'] 
  },
  { 
    id: 'iron-gold', 
    tenantId: 'iron-gym', 
    name: 'Plano Gold Semestral (Pix Recorrente)', 
    price: 139.90, 
    period: 'Semestral', 
    activeStudents: 210, 
    features: ['Livre Acesso Musculação', 'Aulas de Ginástica Coletiva', 'Agendamento de Spinning Express', '1 Avaliação Física Mensal Inclusa'] 
  },
  { 
    id: 'iron-black', 
    tenantId: 'iron-gym', 
    name: 'Plano Black VIP Recorrente (Anual)', 
    price: 199.90, 
    period: 'Anual', 
    activeStudents: 184, 
    features: ['Acesso Musculação, Funcional e Boxe', 'Levar 1 Convidado por semana de graça', 'Isenção de taxa de manutenção anual', 'Acesso ilimitado e Toalha/Shakeria cortesia', 'App do Aluno Premium White-Label'] 
  },

  // Zen Yoga plans
  { id: 'zen-basic', tenantId: 'zen-yoga', name: 'Yoga Flex 2x', price: 189.00, period: 'Mensal', activeStudents: 34, features: ['2 aulas semanais', 'Meditação guiada', 'Mat reserva'] },
  { id: 'zen-unlimited', tenantId: 'zen-yoga', name: 'Zen Total Livre', price: 290.00, period: 'Trimestral', activeStudents: 56, features: ['Acesso ilimitado a aulas', 'Oficinas e Workshops', 'Infusão de chás inclusa', 'Desconto no SPA'] },

  // Fit & Fight plans
  { id: 'fight-standard', tenantId: 'fit-fight', name: 'Arena Combat', price: 159.00, period: 'Mensal', activeStudents: 92, features: ['Muay Thai ou Jiu Jitsu', 'Área funcional', '2 check-ins diários'] }
];

// Seed Students with rich, realistic scenario states (Inadimplentes, Churn Risks, Ativos)
const initialStudents: Student[] = [
  // Vortex Arena Club students (Vortex Elite)
  { 
    id: 'std-1', 
    tenantId: 'iron-gym', 
    name: 'Thiago Silva Santos', 
    email: 'thiago.silva@gmail.com', 
    phone: '(11) 98123-4567', 
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 
    status: 'Ativo', 
    planId: 'iron-gold', 
    registrationDate: '2025-01-15', 
    nextBillingDate: '2026-07-15', 
    attendanceRate: 92, 
    totalCheckins: 112 
  },
  { 
    id: 'std-2', 
    tenantId: 'iron-gym', 
    name: 'Juliana Mendes Rezende', 
    email: 'ju.mendes@hotmail.com', 
    phone: '(11) 99234-5678', 
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 
    status: 'Ativo', 
    planId: 'iron-black', 
    registrationDate: '2025-03-10', 
    nextBillingDate: '2026-07-20', 
    attendanceRate: 85, 
    totalCheckins: 78 
  },
  { 
    id: 'std-3', 
    tenantId: 'iron-gym', 
    name: 'Lucas Pinheiro Lima', 
    email: 'lucas.pinheiro@outlook.com', 
    phone: '(11) 97345-6789', 
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', 
    status: 'Em Risco', // High Churn Risk (Absent for many days)
    planId: 'iron-silver', 
    registrationDate: '2025-06-20', 
    nextBillingDate: '2026-06-25', 
    attendanceRate: 24, 
    totalCheckins: 18 
  },
  { 
    id: 'std-4', 
    tenantId: 'iron-gym', 
    name: 'Mariana Costa Ferreira', 
    email: 'mari.costa@yahoo.com', 
    phone: '(11) 96456-7890', 
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 
    status: 'Ativo', 
    planId: 'iron-click', 
    registrationDate: '2025-02-05', 
    nextBillingDate: '2026-07-05', 
    attendanceRate: 95, 
    totalCheckins: 134 
  },
  { 
    id: 'std-5', 
    tenantId: 'iron-gym', 
    name: 'Carlos Eduardo Souza', 
    email: 'carlinhos99@gmail.com', 
    phone: '(11) 95567-8901', 
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 
    status: 'Pendente', // Active Delinquency
    planId: 'iron-silver', 
    registrationDate: '2026-05-10', 
    nextBillingDate: '2026-06-08', // Overdue since 2 days ago
    attendanceRate: 15, 
    totalCheckins: 4 
  },
  { 
    id: 'std-6', 
    tenantId: 'iron-gym', 
    name: 'Patrícia Alencar Dias', 
    email: 'paty.dias@gmail.com', 
    phone: '(11) 94678-9012', 
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 
    status: 'Inativo', // Former student (target of reactivation campaigns)
    planId: 'iron-silver', 
    registrationDate: '2024-08-11', 
    nextBillingDate: '2025-08-11', 
    attendanceRate: 0, 
    totalCheckins: 120 
  },
  { 
    id: 'std-10', 
    tenantId: 'iron-gym', 
    name: 'Renato Augusto Alvarenga', 
    email: 'renatinho.crf@gmail.com', 
    phone: '(11) 98321-4466', 
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 
    status: 'Pendente', // Active Delinquency
    planId: 'iron-black', 
    registrationDate: '2025-09-12', 
    nextBillingDate: '2026-06-05', // Overdue since 5 days ago
    attendanceRate: 70, 
    totalCheckins: 55 
  },
  { 
    id: 'std-11', 
    tenantId: 'iron-gym', 
    name: 'Beatriz Vasconcellos Silva', 
    email: 'bia.silva@outlook.com', 
    phone: '(11) 98012-3456', 
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 
    status: 'Em Risco', // Low attendance risk
    planId: 'iron-gold', 
    registrationDate: '2025-11-01', 
    nextBillingDate: '2026-06-18', 
    attendanceRate: 10, 
    totalCheckins: 9 
  },

  // Zen Yoga students
  { id: 'std-7', tenantId: 'zen-yoga', name: 'Beatriz Vasconcellos', email: 'beatriz.yoga@gmail.com', phone: '(11) 91122-3344', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', status: 'Ativo', planId: 'zen-unlimited', registrationDate: '2025-04-01', nextBillingDate: '2026-07-01', attendanceRate: 88, totalCheckins: 60 },
  { id: 'std-8', tenantId: 'zen-yoga', name: 'Roberto Alencar', email: 'robalencar@gmail.com', phone: '(11) 92233-4455', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', status: 'Em Risco', planId: 'zen-basic', registrationDate: '2025-01-08', nextBillingDate: '2026-06-08', attendanceRate: 20, totalCheckins: 14 }
];

// Seed Leads (leads) - Commercial CRM Funnel
const initialLeads: Lead[] = [
  // Vortex Arena Club leads
  { id: 'lead-1', tenantId: 'iron-gym', name: 'Rodrigo Faro Silva', email: 'rodrigo.faro@gmail.com', phone: '(11) 99111-9988', status: 'Novo', source: 'Instagram', date: '2026-06-08', notes: 'Quer saber mais sobre o plano Black VIP anual. Veio do anúncio de musculação 24h.' },
  { id: 'lead-2', tenantId: 'iron-gym', name: 'Isabela Fontes Melo', email: 'isabelinha.melo@gmail.com', phone: '(11) 99222-8877', status: 'Contato', source: 'Google', date: '2026-06-07', notes: 'Perguntou via WhatsApp se tem direito a estacionamento no subsolo e acompanhamento de personal.' },
  { id: 'lead-3', tenantId: 'iron-gym', name: 'Arthur Ramos Neto', email: 'art.neto@gmail.com', phone: '(11) 99333-7766', status: 'Visita', source: 'WhatsApp Direct', date: '2026-06-05', notes: 'Agendou aula experimental gratuita de CrossFit para amanhã às 19h com Coach Rafael.' },
  { id: 'lead-4', tenantId: 'iron-gym', name: 'Karina Schultz Costa', email: 'karina.s@gmail.com', phone: '(11) 99444-6655', status: 'Matriculado', source: 'Indicação', date: '2026-06-01', notes: 'Amiga do Thiago Santos. Matriculou no plano Black VIP para treinar musculação em dupla.' },
  { id: 'lead-5', tenantId: 'iron-gym', name: 'Bruno Guimarães', email: 'brunogui@gmail.com', phone: '(11) 99555-5544', status: 'Perdido', source: 'Site', date: '2026-05-25', notes: 'Achou o ticket médio alto comparado com academia de bairro "low-cost". Optou por fechar musculação básica.' },
  { id: 'lead-6', tenantId: 'iron-gym', name: 'Felipe Melo Bronze', email: 'felipe.bronze@outlook.com', phone: '(11) 99111-0987', status: 'Novo', source: 'WhatsApp Direct', date: '2026-06-09', notes: 'Interessado em agendar aula de Spinning Express à tarde.' },

  // Zen Yoga leads
  { id: 'lead-7', tenantId: 'zen-yoga', name: 'Camila Pitanga Coelho', email: 'camila.pitanga@gmail.com', phone: '(11) 98988-1234', status: 'Novo', source: 'Instagram', date: '2026-06-09', notes: 'Busca alívio de estresse com Yoga e Meditação.' }
];

// Seed Fitness Classes - Features low occupancy and high occupancy classes for business scenario
const initialClasses: FitnessClass[] = [
  // Vortex Arena Club Classes
  { id: 'cls-1', tenantId: 'iron-gym', name: 'CrossFit WOD', instructor: 'Coach Rafael', time: '07:00 - 08:00', days: ['Seg', 'Qua', 'Sex'], capacity: 15, enrolled: 15, category: 'Funcional' }, // FULLY BOOKED DEMO
  { id: 'cls-2', tenantId: 'iron-gym', name: 'Spinning Blast', instructor: 'Professora Paula', time: '18:30 - 19:15', days: ['Ter', 'Qui'], capacity: 20, enrolled: 18, category: 'Cardio' },
  { id: 'cls-3', tenantId: 'iron-gym', name: 'Boxe Elite', instructor: 'Mestre Robson', time: '19:30 - 20:30', days: ['Seg', 'Qua', 'Sex'], capacity: 16, enrolled: 14, category: 'Força' },
  { id: 'cls-4', tenantId: 'iron-gym', name: 'HIIT Cardio Tarde (Ocupação Alerta)', instructor: 'Professora Cláudia', time: '14:00 - 15:00', days: ['Ter', 'Qui'], capacity: 25, enrolled: 3, category: 'Cardio' }, // LOW OCCUPACY DEMO
  { id: 'cls-5', tenantId: 'iron-gym', name: 'Pilates Solo Premium', instructor: 'Profa. Cláudia', time: '09:00 - 10:00', days: ['Ter', 'Qui'], capacity: 10, enrolled: 9, category: 'Flexibilidade' },

  // Zen Yoga
  { id: 'cls-6', tenantId: 'zen-yoga', name: 'Vinyasa Flow', instructor: 'Yogini Prema', time: '08:00 - 09:30', days: ['Seg', 'Qua'], capacity: 12, enrolled: 10, category: 'Flexibilidade' },
  { id: 'cls-7', tenantId: 'zen-yoga', name: 'Ashtanga Primária', instructor: 'Instrutor Marcelo', time: '19:00 - 20:30', days: ['Ter', 'Qui'], capacity: 10, enrolled: 6, category: 'Força' }
];

// Seed Bookings (Check-ins / Presence)
const initialBookings: Booking[] = [
  { id: 'b-1', tenantId: 'iron-gym', studentId: 'std-1', studentName: 'Thiago Silva Santos', classId: 'cls-1', className: 'CrossFit WOD', date: '2026-06-10', time: '07:00', status: 'Check-in Realizado' },
  { id: 'b-2', tenantId: 'iron-gym', studentId: 'std-2', studentName: 'Juliana Mendes Rezende', classId: 'cls-3', className: 'Boxe Elite', date: '2026-06-10', time: '19:30', status: 'Agendado' },
  { id: 'b-3', tenantId: 'iron-gym', studentId: 'std-4', studentName: 'Mariana Costa Ferreira', classId: 'cls-2', className: 'Spinning Blast', date: '2026-06-10', time: '18:30', status: 'Agendado' },
  { id: 'b-4', tenantId: 'zen-yoga', studentId: 'std-7', studentName: 'Beatriz Vasconcellos', classId: 'cls-6', className: 'Vinyasa Flow', date: '2026-06-10', time: '08:00', status: 'Check-in Realizado' }
];

// Seed Payments - For visual cash leaks
const initialPayments: Payment[] = [
  // Vortex Arena Club Payments
  { id: 'pay-1', tenantId: 'iron-gym', studentId: 'std-1', studentName: 'Thiago Silva Santos', amount: 139.90, dueDate: '2026-06-15', status: 'Pago', method: 'Pix', paymentDate: '2026-06-10' },
  { id: 'pay-2', tenantId: 'iron-gym', studentId: 'std-2', studentName: 'Juliana Mendes Rezende', amount: 199.90, dueDate: '2026-06-10', status: 'Pago', method: 'Cartão', paymentDate: '2026-06-09' },
  { id: 'pay-3', tenantId: 'iron-gym', studentId: 'std-3', studentName: 'Lucas Pinheiro Lima', amount: 159.90, dueDate: '2026-06-25', status: 'Pendente', method: '-' },
  { id: 'pay-4', tenantId: 'iron-gym', studentId: 'std-4', studentName: 'Mariana Costa Ferreira', amount: 139.90, dueDate: '2026-07-05', status: 'Pago', method: 'Pix', paymentDate: '2026-06-05' },
  { id: 'pay-5', tenantId: 'iron-gym', studentId: 'std-5', studentName: 'Carlos Eduardo Souza', amount: 159.90, dueDate: '2026-06-08', status: 'Atrasado', method: '-' }, // 2 days overdue
  { id: 'pay-6', tenantId: 'iron-gym', studentId: 'std-6', studentName: 'Patrícia Alencar Dias', amount: 159.90, dueDate: '2025-08-11', status: 'Pago', method: 'Cartão', paymentDate: '2025-08-10' },
  { id: 'pay-10', tenantId: 'iron-gym', studentId: 'std-10', studentName: 'Renato Augusto Alvarenga', amount: 199.90, dueDate: '2026-06-05', status: 'Atrasado', method: '-' } // 5 days overdue
];

// Seed Team Members
const initialTeam: TeamMember[] = [
  { id: 'team-1', tenantId: 'iron-gym', name: 'Marcos Aurelio Silveira', role: 'Dono', email: 'marcos@vortexclub.com.br', phone: '(11) 98888-1111', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', active: true },
  { id: 'team-2', tenantId: 'iron-gym', name: 'Ana Flávia Lopes', role: 'Recepcionista', email: 'ana.flavia@vortexclub.com.br', phone: '(11) 98888-2222', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', active: true },
  { id: 'team-3', tenantId: 'iron-gym', name: 'Prof. Rafael Albuquerque', role: 'Professor', email: 'rafael@vortexclub.com.br', phone: '(11) 98888-3333', avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150', active: true }
];

// Seed Marketing Campaigns & Automations - Real Fitness market copywriting in Brazil
const initialCampaigns: MarketingCampaign[] = [
  {
    id: 'camp-1',
    tenantId: 'iron-gym',
    name: 'Cobrança Amigável - Inadimplência',
    channel: 'WhatsApp',
    triggerType: 'Inadimplência',
    templateText: 'Olá {aluno_nome}, identificamos que sua fatura do {plano_nome} no valor de R$ {plano_preco} está pendente. Clique no link para fazer o pagamento rápido via Pix Copia-e-Cola e manter seu QR Code de acesso carata liberado: vortexjardins.gymflow.com.br/pagamento',
    status: 'Ativo',
    sentCount: 184,
    conversionCount: 52
  },
  {
    id: 'camp-2',
    tenantId: 'iron-gym',
    name: 'Alerta Preventivo de Churn (+7 Dias Ausente)',
    channel: 'WhatsApp',
    triggerType: 'Ausência +7 dias',
    templateText: 'E aí, {aluno_nome}! Sentimos falta do seu treino no Vortex Club nesta última semana. A constância é fundamental para atingirmos seus objetivos fit. Temos aula coletiva incrível amanhã, que tal reservar seu check-in pelo aplicativo?',
    status: 'Ativo',
    sentCount: 112,
    conversionCount: 39
  },
  {
    id: 'camp-3',
    tenantId: 'iron-gym',
    name: 'Boas-vindas & Onboarding de Aluno',
    channel: 'WhatsApp',
    triggerType: 'Boas-vindas',
    templateText: 'Seja muito bem-vindo ao Vortex Club, {aluno_nome}! Seu Plano está ativo. Baixe nosso App do Aluno, confira o treino montado pelos professores e reserve seu primeiro check-in agora: vortexjardins.gymflow.com.br/app',
    status: 'Ativo',
    sentCount: 420,
    conversionCount: 395
  },
  {
    id: 'camp-4',
    tenantId: 'iron-gym',
    name: 'Reativação de Ex-Alunos (Inativos)',
    channel: 'WhatsApp',
    triggerType: 'Manual',
    templateText: 'Oi, {aluno_nome}! Faz mais de 30 dias que você encerrou suas atividades no Vortex Club. Para incentivar o seu retorno à rotina saudável, conseguimos isenção de matrícula e 20% de desconto recorrente reativando antes de sexta! Clique para aceitar.',
    status: 'Ativo',
    sentCount: 85,
    conversionCount: 17
  }
];

const LOCAL_STORAGE_KEY = 'gymflow_saas_state_v1';

export function getInitialState(): AppState {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored GymFlow state:', e);
    }
  }

  const state: AppState = {
    tenants: initialTenants,
    currentTenantId: 'iron-gym',
    students: initialStudents,
    leads: initialLeads,
    plans: initialPlans,
    classes: initialClasses,
    bookings: initialBookings,
    payments: initialPayments,
    team: initialTeam,
    campaigns: initialCampaigns
  };

  saveState(state);
  return state;
}

export function saveState(state: AppState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

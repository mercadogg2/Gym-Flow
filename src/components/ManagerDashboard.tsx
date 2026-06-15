/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tenant, Student, Lead, Plan, FitnessClass, Booking, Payment, TeamMember, MarketingCampaign, AppState } from '../types';
import { 
  Users, 
  UserCheck, 
  HelpCircle, 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  Percent, 
  DollarSign, 
  Activity, 
  BookOpen, 
  Trash2, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Filter, 
  Send, 
  UserPlus, 
  ChevronRight, 
  Search,
  Calendar,
  Lock,
  Eye,
  Sliders,
  DollarSign as MoneyIcon,
  Sparkles
} from 'lucide-react';

interface ManagerDashboardProps {
  state: AppState;
  onUpdateTenant: (updatedTenant: Tenant) => void;
  onAddStudent: (newStudent: Student) => void;
  onUpdateStudentStatus: (studentId: string, status: Student['status']) => void;
  onAddLead: (newLead: Lead) => void;
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => void;
  onAddPayment: (newPayment: Payment) => void;
  onMarkPaymentPaid: (paymentId: string) => void;
  onTriggerCampaign: (campaignId: string) => void;
}

export default function ManagerDashboard({
  state,
  onUpdateTenant,
  onAddStudent,
  onUpdateStudentStatus,
  onAddLead,
  onUpdateLeadStatus,
  onAddPayment,
  onMarkPaymentPaid,
  onTriggerCampaign
}: ManagerDashboardProps) {
  
  // Active tenant matching global select
  const tenant = state.tenants.find(t => t.id === state.currentTenantId) || state.tenants[0];

  // Personas inside manager workspace: Dono/Gestor, Recepção, Professor
  const [activePersona, setActivePersona] = useState<'Dono' | 'Recepcionista' | 'Professor'>('Dono');

  // Currently opened tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'alunos' | 'financeiro' | 'turmas' | 'campanhas' | 'equipe'>('dashboard');

  // Filter modules check
  const modules = tenant.activeModules;

  // Filter local data to match active tenant
  const tenantStudents = state.students.filter(s => s.tenantId === tenant.id);
  const tenantLeads = state.leads.filter(l => l.tenantId === tenant.id);
  const tenantPayments = state.payments.filter(p => p.tenantId === tenant.id);
  const tenantClasses = state.classes.filter(c => c.tenantId === tenant.id);
  const tenantTeam = state.team.filter(tm => tm.tenantId === tenant.id);
  const tenantCampaigns = state.campaigns.filter(cp => cp.tenantId === tenant.id);
  const tenantPlans = state.plans.filter(pl => pl.tenantId === tenant.id);

  // Searches/Filters States
  const [studentSearch, setStudentSearch] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState<string>('Todos');
  const [paymentFilter, setPaymentFilter] = useState<string>('Todos');

  // New item creators
  const [showAddLead, setShowAddLead] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSource, setLeadSource] = useState<'Instagram' | 'Indicação' | 'Google' | 'Site' | 'WhatsApp Direct'>('Instagram');
  const [leadNotes, setLeadNotes] = useState('');

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPlanId, setStudentPlanId] = useState(tenantPlans[0]?.id || '');

  // Log Toast actions (WhatsApp logs)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persona auto redirect for safety
  React.useEffect(() => {
    if (activePersona === 'Professor' && activeTab !== 'turmas' && activeTab !== 'alunos') {
      setActiveTab('turmas'); // Force class view on Gym teacher
    }
  }, [activePersona]);

  // Calculations for KPI
  const activeStudentsCount = tenantStudents.filter(s => s.status === 'Ativo').length;
  const pendingStudentsCount = tenantStudents.filter(s => s.status === 'Pendente').length;
  const inRiskStudentsCount = tenantStudents.filter(s => s.status === 'Em Risco').length;
  const totalLeadsCount = tenantLeads.length;
  const matriculadosLeadsCount = tenantLeads.filter(l => l.status === 'Matriculado').length;
  
  // Lead conversion rate
  const leadConversionRate = totalLeadsCount > 0 ? (matriculadosLeadsCount / totalLeadsCount) * 100 : 0;

  // Delinquency rate
  const unpaidInvoices = tenantPayments.filter(p => p.status === 'Atrasado');
  const totalInvoices = tenantPayments.length;
  const delinquencyRate = totalInvoices > 0 ? (unpaidInvoices.length / totalInvoices) * 100 : 0;

  // Total collected billing
  const totalCollected = tenantPayments.filter(p => p.status === 'Pago').reduce((acc, cr) => acc + cr.amount, 0);
  const totalPending = tenantPayments.filter(p => p.status === 'Pendente' || p.status === 'Atrasado').reduce((acc, cr) => acc + cr.amount, 0);

  // Handlers
  const handleAddNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    const newL: Lead = {
      id: `lead-cl-${Date.now()}`,
      tenantId: tenant.id,
      name: leadName,
      email: `${leadName.toLowerCase().replace(/[^a-z]/g, '')}@exemplo.com`,
      phone: leadPhone,
      status: 'Novo',
      source: leadSource,
      date: new Date().toISOString().split('T')[0],
      notes: leadNotes
    };

    onAddLead(newL);
    setShowAddLead(false);
    setLeadName('');
    setLeadPhone('');
    setLeadNotes('');
    triggerToast(`Lead de "${leadName}" capturado no CRM com sucesso!`);
  };

  const handleCreateStudentFromLead = (ld: Lead) => {
    // Quickly matriculate a lead as a formal student
    onUpdateLeadStatus(ld.id, 'Matriculado');
    
    const newSt: Student = {
      id: `std-mat-${Date.now()}`,
      tenantId: tenant.id,
      name: ld.name,
      email: ld.email,
      phone: ld.phone,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', // Default
      status: 'Ativo',
      planId: studentPlanId || tenantPlans[0]?.id || 'iron-silver',
      registrationDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      attendanceRate: 100,
      totalCheckins: 0
    };

    onAddStudent(newSt);
    
    // Auto generate immediate payment log
    const planObj = tenantPlans.find(p => p.id === newSt.planId) || tenantPlans[0];
    const newPay: Payment = {
      id: `pay-gen-${Date.now()}`,
      tenantId: tenant.id,
      studentId: newSt.id,
      studentName: newSt.name,
      amount: planObj ? planObj.price : 99.90,
      dueDate: newSt.nextBillingDate,
      status: 'Pendente',
      method: '-'
    };
    onAddPayment(newPay);

    triggerToast(`🎉 Aluno(a) "${ld.name}" matriculado! Cadastro gerado e cobrança vinculada.`);
  };

  const handleCustomAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !studentEmail) return;

    const newSt: Student = {
      id: `std-custom-${Date.now()}`,
      tenantId: tenant.id,
      name: studentName,
      email: studentEmail,
      phone: studentPhone,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      status: 'Ativo',
      planId: studentPlanId || tenantPlans[0]?.id || 'iron-silver',
      registrationDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      attendanceRate: 100,
      totalCheckins: 0
    };

    onAddStudent(newSt);

    const planObj = tenantPlans.find(p => p.id === newSt.planId) || tenantPlans[0];
    const newPay: Payment = {
      id: `pay-gen-${Date.now()}`,
      tenantId: tenant.id,
      studentId: newSt.id,
      studentName: newSt.name,
      amount: planObj ? planObj.price : 99.90,
      dueDate: newSt.nextBillingDate,
      status: 'Pendente',
      method: '-'
    };
    onAddPayment(newPay);

    setShowAddStudent(false);
    setStudentName('');
    setStudentPhone('');
    setStudentEmail('');
    triggerToast(`Aluno(a) "${studentName}" adicionado diretamente com plano ativo.`);
  };

  const handlePaymentSettle = (payId: string) => {
    onMarkPaymentPaid(payId);
    triggerToast('💰 Fatura liquidada! Faturamento recebido atualizado nos KPIs.');
  };

  const handleTriggerAutomation = (campaign: MarketingCampaign) => {
    onTriggerCampaign(campaign.id);
    
    // Simulate sending actual message structure to students matching trigger category
    let targetStudentName = "Thiago Silva";
    if (campaign.triggerType === 'Inadimplência') {
      const delinquent = tenantStudents.find(s => s.status === 'Pendente' || s.status === 'Em Risco');
      if (delinquent) targetStudentName = delinquent.name;
    } else if (campaign.triggerType === 'Ausência +7 dias') {
      const inRisk = tenantStudents.find(s => s.status === 'Em Risco');
      if (inRisk) targetStudentName = inRisk.name;
    }

    const compiledText = campaign.templateText
      .replace('{aluno_nome}', targetStudentName)
      .replace('{plano_nome}', 'Plano Standard')
      .replace('{plano_preco}', '119.90')
      .replace('{aula_curtida}', 'Crossfit')
      .replace('{link_pagamento}', 'pix.gymflow.com/pay-3482');

    triggerToast(`⚡ Disparando WhatsApp via gateway GymFlow:\n"${compiledText}"`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5500);
  };

  return (
    <div id="manager-dashboard-view" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Floating Dynamic Logs Action Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-55 max-w-sm bg-slate-950 border-2 border-emerald-500 rounded-xl p-4 shadow-xl shadow-emerald-950/20 animate-fadeIn text-xs leading-relaxed text-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold uppercase tracking-wider text-emerald-400">Notificação do Gateway</span>
          </div>
          <span className="whitespace-pre-line block">{toastMessage}</span>
        </div>
      )}

      {/* Top Tenant Header Info Bar */}
      <div className="bg-slate-950 border-b border-slate-800 py-3 px-6 text-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        
        {/* White-label gym name indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tenant.primaryColor }} />
          <span className="font-bold text-slate-300">Unidade Logada:</span>
          <span className="text-white font-extrabold">{tenant.name}</span>
          <span className="text-slate-500 font-mono">({tenant.domain})</span>
        </div>

        {/* Workspace role switcher (dono recept professor) */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-850">
          <span className="text-slate-400 font-medium px-2 block">Perfil de Acesso:</span>
          {[
            { id: 'Dono' as const, label: 'Dono/Gestor' },
            { id: 'Recepcionista' as const, label: 'Recepção' },
            { id: 'Professor' as const, label: 'Professor' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setActivePersona(opt.id)}
              className={`px-2 py-1 rounded text-[10px] font-bold transition focus:outline-none cursor-pointer ${
                activePersona === opt.id 
                  ? 'bg-slate-950 text-white shadow' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Workspace Layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        
        {/* Left Side Navigation Pane */}
        <aside className="w-full lg:w-64 bg-slate-950 border-r border-slate-850 flex flex-col justify-between py-6">
          <div className="space-y-6 px-4">
            
            {/* White labeled Heading */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-900">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base shadow"
                style={{ backgroundColor: tenant.primaryColor }}
              >
                {tenant.logoText ? tenant.logoText[0] : 'G'}
              </div>
              <div>
                <h2 className="text-sm font-black text-white leading-tight uppercase truncate max-w-[140px]">
                  {tenant.logoText || tenant.name}
                </h2>
                <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Painel do Staff</span>
              </div>
            </div>

            {/* Nav List links */}
            <nav className="space-y-1">
              
              {activePersona !== 'Professor' && (
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition ${
                    activeTab === 'dashboard' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
                  }`}
                >
                  <Activity className="w-4 h-4" /> Painel Principal
                </button>
              )}

              {activePersona !== 'Professor' && modules.leads && (
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition ${
                    activeTab === 'leads' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-rose-500" /> CRM Funil de Leads
                </button>
              )}

              <button
                onClick={() => setActiveTab('alunos')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition ${
                  activeTab === 'alunos' 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" /> Alunos Matriculados
              </button>

              {activePersona !== 'Professor' && modules.financeiro && (
                <button
                  onClick={() => setActiveTab('financeiro')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition ${
                    activeTab === 'financeiro' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
                  }`}
                >
                  <MoneyIcon className="w-4 h-4 text-emerald-500" /> Painel Financeiro
                </button>
              )}

              <button
                onClick={() => setActiveTab('turmas')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition ${
                  activeTab === 'turmas' 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-indigo-400" /> Turmas & Check-ins
              </button>

              {activePersona === 'Dono' && modules.campanhas && (
                <button
                  onClick={() => setActiveTab('campanhas')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition ${
                    activeTab === 'campanhas' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-amber-500" /> Automações WhatsApp
                </button>
              )}

              {activePersona === 'Dono' && modules.equipe && (
                <button
                  onClick={() => setActiveTab('equipe')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition ${
                    activeTab === 'equipe' 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-4 h-4" /> Gestão de Equipe
                </button>
              )}
            </nav>
          </div>

          {/* Quick tips about simulation restrictions */}
          <div className="px-4 text-[10px] text-slate-500 space-y-1.5">
            <div className="border-t border-slate-950 pt-4" />
            <p className="leading-relaxed">Você está operando no modo demonstração com a marca <strong>{tenant.name}</strong>.</p>
          </div>
        </aside>

        {/* Right main body viewport */}
        <main className="flex-1 p-6 space-y-8 overflow-x-hidden">
          
          {/* TAB 1: GENERAL MANAGER KPIS */}
          {activeTab === 'dashboard' && activePersona !== 'Professor' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header Title Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-850">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#BEF264]/10 text-[#BEF264] text-[10px] font-black uppercase tracking-wider">Visão Executiva</span>
                    <span className="text-slate-500 font-mono text-[10px]">• Recorrente Ativo</span>
                  </div>
                  <h1 className="text-2xl font-black text-white tracking-tight mt-1">Painel Gerencial Strategical</h1>
                  <p className="text-xs text-slate-400">Dados consolidados de retenção, receita, conversão de funil de vendas e risco de evasão.</p>
                </div>
                
                {/* Simulated database setup status indicator */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-300 font-bold">Base Integrada</span>
                  </div>
                </div>
              </div>

              {/* Critical Alert Banner for Churn & Delinquency */}
              <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wide">
                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" /> Alerta Crítico de Retenção (Evasão Ativa)
                  </div>
                  <p className="text-xs text-slate-300">
                    Detectamos <strong>{tenantStudents.filter(s => s.status === 'Em Risco').length} alunos premium</strong> sem nenhum registro de check-in há mais de 8 dias consecutivos.
                  </p>
                </div>
                <div className="flex gap-2.5 shrink-0">
                  <button 
                    onClick={() => setActiveTab('alunos')}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    Ver Lista de Riscos
                  </button>
                  <button 
                    onClick={() => setActiveTab('campanhas')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition"
                  >
                    Cobrar Inativos via WhatsApp
                  </button>
                </div>
              </div>

              {/* Painel de Diagnóstico & Oportunidades Comerciais */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#BEF264] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#BEF264]" /> Oportunidades de Crescimento de Caixa Reguladas
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">GymFlow Retenção Preditiva v1.2</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Alert 1 */}
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl space-y-1.5 hover:bg-amber-500/15 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Ausência Crítica</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-black">RETER</span>
                    </div>
                    <h4 className="text-sm font-black text-white">{tenantStudents.filter(s => s.attendanceRate < 30 && s.status !== 'Inativo').length + 8} alunos com baixa frequência</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">Evasão silenciosa identificada: ausentes há mais de 8 dias consecutivos. Evite cancelamentos.</p>
                    <button onClick={() => setActiveTab('alunos')} className="text-[10px] text-amber-300 font-bold hover:underline flex items-center gap-0.5 mt-1">
                      Visualizar faltosos →
                    </button>
                  </div>

                  {/* Alert 2 */}
                  <div className="bg-[#BEF264]/10 border border-[#BEF264]/20 p-4 rounded-xl space-y-1.5 hover:bg-[#BEF264]/15 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#BEF264] tracking-wider">Renovação Iminente</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#BEF264] text-black text-[9px] font-black">RENOVAR</span>
                    </div>
                    <h4 className="text-sm font-black text-white">8 renovações nos próximos 7 dias</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">Planos semestrais ou anuais a vencer. Disparos pré-programados prontos no WhatsApp.</p>
                    <button onClick={() => setActiveTab('financeiro')} className="text-[10px] text-[#BEF264] font-bold hover:underline flex items-center gap-0.5 mt-1">
                      Ver faturas emitidas →
                    </button>
                  </div>

                  {/* Alert 3 */}
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl space-y-1.5 hover:bg-cyan-500/15 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">Ocupação Alerta</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-black text-[9px] font-black">COMPLETAR</span>
                    </div>
                    <h4 className="text-sm font-black text-white">2 turmas abaixo da ocupação ideal</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">Ociosidade detectada em "HIIT Cardio Tarde". Envie convites de experimental.</p>
                    <button onClick={() => setActiveTab('turmas')} className="text-[10px] text-cyan-300 font-bold hover:underline flex items-center gap-0.5 mt-1">
                      Ver turmas vazias →
                    </button>
                  </div>

                  {/* Alert 4 */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-1.5 hover:bg-emerald-500/15 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Reativação</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-black">PROSPECTAR</span>
                    </div>
                    <h4 className="text-sm font-black text-white">Há oportunidade de reativar 17 ex-alunos</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">Contas desativadas há 30+ dias. Oferta "Isenção de Matrícula" pronta para lote.</p>
                    <button onClick={() => setActiveTab('campanhas')} className="text-[10px] text-emerald-300 font-bold hover:underline flex items-center gap-0.5 mt-1">
                      Lançar campanha →
                    </button>
                  </div>

                </div>
              </div>

              {/* KPI metrics row with Left Gradient Borders */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="bg-slate-950 p-5 rounded-2xl border-l-4 border-l-[#BEF264] border-y border-r border-slate-850 space-y-2 relative overflow-hidden group">
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Alunos Ativos</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-white font-mono">{activeStudentsCount}</span>
                    <span className="text-xs font-semibold text-emerald-400">/{tenantStudents.length} matriculados</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-tight">Engajamento corrente saudável</span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border-l-4 border-l-rose-500 border-y border-r border-slate-850 space-y-2 relative overflow-hidden group">
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Leads a Tratar</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-white font-mono">{tenantLeads.filter(l => l.status !== 'Matriculado').length}</span>
                    <span className="text-xs font-semibold text-rose-400">Atração Ativa</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-tight">Contatos vindos do Instagram</span>
                </div>

                {modules.relatorios && (
                  <div className="bg-slate-950 p-5 rounded-2xl border-l-4 border-l-cyan-400 border-y border-r border-slate-850 space-y-2 relative overflow-hidden group">
                    <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition">
                      <Zap className="w-12 h-12 text-white" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Conversão em Vendas</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-white font-mono">{leadConversionRate.toFixed(1)}%</span>
                      <span className="text-xs text-cyan-400 font-medium">Meta: 35%</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight">Taxa de matrícula efetiva</span>
                  </div>
                )}

                {modules.relatorios && (
                  <div className="bg-slate-950 p-5 rounded-2xl border-l-4 border-l-red-500 border-y border-r border-slate-850 space-y-2 relative overflow-hidden group">
                    <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition">
                      <MoneyIcon className="w-12 h-12 text-white" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Inadimplência GERAL</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-rose-500 font-mono">{delinquencyRate.toFixed(1)}%</span>
                      <span className="text-xs text-slate-400 font-semibold">{unpaidInvoices.length} faturas atrasadas</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight">Pix e Crédito automático</span>
                  </div>
                )}
              </div>

              {/* Advanced Reports Section if enabled */}
              {modules.relatorios ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left block overview */}
                  <div className="lg:col-span-12 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Retenção de Alunos em Risco</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">Estes alunos estão ativos no sistema, porém não realizam nenhum check-in presencial nas catracas há mais de 7 dias consecutivos. Use automações de WhatsApp para recuperá-los:</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {tenantStudents.filter(s => s.status === 'Em Risco').map(s => (
                        <div key={s.id} className="p-3 bg-slate-900 rounded-xl border border-rose-500/15 flex justify-between items-center">
                          <div className="flex items-center gap-2.5">
                            <img src={s.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                            <div>
                              <h4 className="text-xs font-bold text-white truncate max-w-[120px]">{s.name}</h4>
                              <p className="text-[9px] text-rose-400 font-semibold font-mono">Frequência: {s.attendanceRate}%</p>
                            </div>
                          </div>
                          
                          {modules.campanhas ? (
                            <button 
                              onClick={() => {
                                const alarm = tenantCampaigns.find(c => c.triggerType === 'Ausência +7 dias');
                                if (alarm) handleTriggerAutomation(alarm);
                              }}
                              className="p-1 px-2 text-[9px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded transition"
                            >
                              Acionar WhatsApp
                            </button>
                          ) : (
                            <span className="text-[8px] text-slate-500 uppercase">Sem Campanhas</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational breakdown widget summary */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Ticket Médio Estimado</h3>
                    <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-2xl font-black text-emerald-400">R$ {tenantPlans.length > 0 ? (tenantPlans.reduce((acc, cr) => acc + cr.price, 0) / tenantPlans.length).toFixed(2) : '129.90'}</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Média ponderada por planos</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-300">Tempo de Estadia</span>
                        <p className="text-xs font-bold text-slate-100">8.4 meses/média</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Ocupação de Turmas</h3>
                    <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-2xl font-black text-white">
                          {(tenantClasses.reduce((acc, cr) => acc + (cr.enrolled / cr.capacity) * 100, 0) / (tenantClasses.length || 1)).toFixed(0)}%
                        </span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Preenchimento de vagas de ginástica</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-300">Total Reservas Hoje</span>
                        <p className="text-xs font-bold text-slate-100">{state.bookings.filter(b => b.tenantId === tenant.id).length} Check-ins</p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-8 bg-slate-950 rounded-2xl border border-slate-850 text-center">
                  <Lock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">Relatórios e Gráficos Gerenciais Avançados Desabilitados</p>
                  <p className="text-[10px] text-slate-500 mt-1">Este módulo é uma funcionalidade premium SaaS da plataforma. Proprietários podem habilitá-lo no menu Super Admin / White-Label correspondente.</p>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: CRM SALES FUNNEL (LEADS PROCESSOR) */}
          {activeTab === 'leads' && activePersona !== 'Professor' && modules.leads && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white">Funil de Vendas & Captação</h1>
                  <p className="text-xs text-slate-400">Previsibilidade de caixa convertendo contatos do Instagram/Site em alunos.</p>
                </div>
                <button 
                  onClick={() => setShowAddLead(true)}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 focus:outline-none transition"
                >
                  <UserPlus className="w-4 h-4" /> Cadastrar Novo Lead
                </button>
              </div>

              {/* Inline Lead add form */}
              {showAddLead && (
                <form onSubmit={handleAddNewLead} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Novo Lead Prospectado</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        value={leadName} 
                        onChange={e => setLeadName(e.target.value)} 
                        required 
                        placeholder="Ex: João Ferreira"
                        className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">WhatsApp de Contato</label>
                      <input 
                        type="text" 
                        value={leadPhone} 
                        onChange={e => setLeadPhone(e.target.value)} 
                        required 
                        placeholder="Ex: (11) 98111-2222"
                        className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Canal de Origem</label>
                      <select 
                        value={leadSource} 
                        onChange={e => setLeadSource(e.target.value as any)}
                        className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                      >
                        <option value="Instagram">Instagram DM</option>
                        <option value="Google">Google Maps/SEO</option>
                        <option value="WhatsApp Direct">WhatsApp Link</option>
                        <option value="Site">Formulário Site</option>
                        <option value="Indicação">Indicação de Aluno</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Anotações Iniciais</label>
                    <input 
                      type="text" 
                      value={leadNotes} 
                      onChange={e => setLeadNotes(e.target.value)} 
                      placeholder="Ex: Procurando Muay Thai para iniciantes de terça e quinta"
                      className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2 text-[10px]">
                    <button 
                      type="button" 
                      onClick={() => setShowAddLead(false)}
                      className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="px-3.5 py-1.5 rounded text-white font-bold"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      Criar Registro CRM
                    </button>
                  </div>
                </form>
              )}

              {/* Sales Funnel Stages Grid Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Column 1: Novo Leads */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" /> Sem Contato
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 font-mono text-slate-400">
                      {tenantLeads.filter(l => l.status === 'Novo').length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {tenantLeads.filter(l => l.status === 'Novo').map(ld => (
                      <div key={ld.id} className="p-3 bg-slate-900 border border-slate-850 rounded-lg space-y-2">
                        <span className="text-[9px] text-slate-500 block">{ld.date} • {ld.source}</span>
                        <h4 className="text-xs font-bold text-white">{ld.name}</h4>
                        <p className="text-[10px] text-slate-400 truncate leading-relaxed">{ld.notes}</p>
                        
                        <div className="flex justify-between pt-1 border-t border-slate-950/80">
                          <button 
                            onClick={() => onUpdateLeadStatus(ld.id, 'Contato')}
                            className="text-[9px] text-cyan-400 font-bold hover:underline transition"
                          >
                            Mover para Contato
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Contato Criado */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> Em Atendimento
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 font-mono text-slate-400">
                      {tenantLeads.filter(l => l.status === 'Contato').length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {tenantLeads.filter(l => l.status === 'Contato').map(ld => (
                      <div key={ld.id} className="p-3 bg-slate-900 border border-slate-850 rounded-lg space-y-2">
                        <span className="text-[9px] text-slate-500 block">{ld.date} • {ld.source}</span>
                        <h4 className="text-xs font-bold text-white">{ld.name}</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{ld.notes}</p>
                        <p className="text-[9px] text-emerald-400 font-mono">{ld.phone}</p>
                        
                        <div className="flex justify-between pt-1 border-t border-slate-950/80">
                          <button 
                            onClick={() => onUpdateLeadStatus(ld.id, 'Visita')}
                            className="text-[9px] text-amber-400 font-bold hover:underline transition"
                          >
                            Agendar Visita
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Visita Agendada */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" /> Aula Experimental / Visita
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 font-mono text-slate-400">
                      {tenantLeads.filter(l => l.status === 'Visita').length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {tenantLeads.filter(l => l.status === 'Visita').map(ld => (
                      <div key={ld.id} className="p-3 bg-slate-900 border border-slate-850 rounded-lg space-y-2">
                        <span className="text-[9px] text-slate-500 block">{ld.source} • {ld.date}</span>
                        <h4 className="text-xs font-bold text-white">{ld.name}</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed text-amber-300 font-semibold">⚠️ {ld.notes}</p>
                        
                        <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-950/80">
                          <button 
                            onClick={() => handleCreateStudentFromLead(ld)}
                            className="w-full py-1 text-[9px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded transition focus:outline-none"
                          >
                            Matricular Aluno
                          </button>
                          <button 
                            onClick={() => onUpdateLeadStatus(ld.id, 'Perdido')}
                            className="w-full text-center py-1 text-[9px] text-slate-400 hover:text-slate-300 bg-slate-950 rounded transition"
                          >
                            Marcar como Perdido
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 4: Matriculados ou Perdidos */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> Finalizados
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 font-mono text-slate-400">
                      {tenantLeads.filter(l => l.status === 'Matriculado' || l.status === 'Perdido').length}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[460px] overflow-y-auto">
                    {tenantLeads.filter(l => l.status === 'Matriculado' || l.status === 'Perdido').map(ld => {
                      const matObj = ld.status === 'Matriculado';
                      return (
                        <div 
                          key={ld.id} 
                          className={`p-3 border rounded-lg space-y-1 ${
                            matObj 
                              ? 'bg-emerald-950/15 border-emerald-800' 
                              : 'bg-red-950/15 border-red-900/60 opacity-60'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-mono font-bold uppercase text-slate-400">
                              {ld.status}
                            </span>
                            <span className="text-[8px] text-slate-500">{ld.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white">{ld.name}</h4>
                          <p className="text-[10px] text-slate-400 leading-normal">{ld.notes}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: MATRICULADOS ALUNOS */}
          {activeTab === 'alunos' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white">Alunos Cadastrados</h1>
                  <p className="text-xs text-slate-400">Quadro de alunos oficiais, planos contratuais e níveis de atividade.</p>
                </div>
                
                {activePersona !== 'Professor' && (
                  <button 
                    onClick={() => setShowAddStudent(true)}
                    className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 focus:outline-none transition"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Diretamente
                  </button>
                )}
              </div>

              {/* Search Rows */}
              <div className="flex flex-wrap gap-3 items-center bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-500" />
                  <input 
                    type="text" 
                    value={studentSearch}
                    onChange={e => setStudentSearch(e.target.value)}
                    placeholder="Pesquisar por nome ou WhatsApp do cadastrado..." 
                    className="w-full text-xs p-2.5 pl-10 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">Status:</span>
                  <select 
                    value={studentStatusFilter}
                    onChange={e => setStudentStatusFilter(e.target.value)}
                    className="text-xs bg-slate-900 border border-slate-850 rounded p-2 text-white font-medium focus:outline-none"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Ativo">Apenas Ativos</option>
                    <option value="Em Risco">Em Risco de Churn</option>
                    <option value="Pendente">Aguardando Pagamento</option>
                    <option value="Inativo">Inativos</option>
                  </select>
                </div>
              </div>

              {/* Subscribed students add form */}
              {showAddStudent && (
                <form onSubmit={handleCustomAddStudent} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Cadastro de Aluno Rápido</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        value={studentName} 
                        onChange={e => setStudentName(e.target.value)} 
                        required 
                        placeholder="Ex: Clara Lima de Souza"
                        className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">E-mail</label>
                      <input 
                        type="email" 
                        value={studentEmail} 
                        onChange={e => setStudentEmail(e.target.value)} 
                        required 
                        placeholder="Ex: clara@email.com"
                        className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">WhatsApp</label>
                      <input 
                        type="text" 
                        value={studentPhone} 
                        onChange={e => setStudentPhone(e.target.value)} 
                        required 
                        placeholder="Ex: (11) 98000-4444"
                        className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Vincular Plano Contratual</label>
                      <select 
                        value={studentPlanId} 
                        onChange={e => setStudentPlanId(e.target.value)}
                        className="w-full text-xs p-2 bg-slate-900 border border-slate-850 rounded text-white focus:outline-none"
                      >
                        {tenantPlans.map(pl => (
                          <option key={pl.id} value={pl.id}>{pl.name} (R$ {pl.price.toFixed(2)})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 text-[10px]">
                    <button 
                      type="button" 
                      onClick={() => setShowAddStudent(false)}
                      className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="px-3.5 py-1.5 rounded text-white font-bold"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      Gerar Matrícula Ativa
                    </button>
                  </div>
                </form>
              )}

              {/* Students grid table */}
              <div className="bg-slate-950 rounded-xl border border-slate-850 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-850">
                      <tr>
                        <th className="p-4">Aluno</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Contato / Celular</th>
                        <th className="p-4">Plano Ativo</th>
                        <th className="p-4">Taxa Presença</th>
                        <th className="p-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {tenantStudents
                        .filter(s => {
                          const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.phone.includes(studentSearch);
                          const matchesFilter = studentStatusFilter === 'Todos' || s.status === studentStatusFilter;
                          return matchesSearch && matchesFilter;
                        })
                        .map(s => {
                          const plan = tenantPlans.find(planItem => planItem.id === s.planId) || tenantPlans[0];
                          
                          // Style badge map
                          let badgeStyle = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
                          if (s.status === 'Em Risco') badgeStyle = 'bg-rose-500/15 text-rose-400 border-rose-500/20';
                          if (s.status === 'Pendente') badgeStyle = 'bg-amber-500/15 text-amber-400 border-amber-500/20';
                          if (s.status === 'Inativo') badgeStyle = 'bg-slate-900 text-slate-500 border-slate-800';

                          return (
                            <tr key={s.id} className="hover:bg-slate-900/30 transition">
                              <td className="p-4 flex items-center gap-3">
                                <img src={s.avatarUrl} className="w-8 h-8 rounded-full object-cover border border-slate-850" alt="" />
                                <div>
                                  <span className="font-bold text-white block">{s.name}</span>
                                  <span className="text-[10px] text-slate-500 block">Matrícula: {s.registrationDate}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${badgeStyle}`}>
                                  {s.status}
                                </span>
                              </td>
                              <td className="p-4 font-mono font-bold text-[11px] text-slate-400">
                                {s.phone}
                              </td>
                              <td className="p-4">
                                <span className="font-medium text-slate-300 block">{plan?.name || s.planId}</span>
                                <span className="text-[10px] text-slate-500 block">Vence em {s.nextBillingDate}</span>
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-slate-100 block">{s.totalCheckins} check-ins</span>
                                <div className="w-24 bg-slate-900 h-1.5 rounded-full mt-1 overflow-hidden border border-slate-850">
                                  <div className="bg-emerald-500 h-full" style={{ width: `${s.attendanceRate}%` }} />
                                </div>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-1.5">
                                  {activePersona !== 'Professor' && (
                                    <select 
                                      value={s.status}
                                      onChange={(e) => onUpdateStudentStatus(s.id, e.target.value as any)}
                                      className="text-[9px] bg-slate-900 border border-slate-800 rounded p-1 text-white focus:outline-none"
                                    >
                                      <option value="Ativo">Ativo</option>
                                      <option value="Pendente">Pendente</option>
                                      <option value="Em Risco">Em Risco</option>
                                      <option value="Inativo">Inativo</option>
                                    </select>
                                  )}
                                  <a 
                                    href={`https://wa.me/${s.phone.replace(/\D/g, '')}`}
                                    className="p-1 px-1.5 bg-slate-900 hover:bg-slate-850 scroll border border-slate-800 text-slate-400 hover:text-white rounded text-[10px] flex items-center gap-1.5"
                                  >
                                    WhatsApp
                                  </a>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: FINANCEIRO & FATURAS */}
          {activeTab === 'financeiro' && activePersona !== 'Professor' && modules.financeiro && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white">Administrativo Financeiro</h1>
                  <p className="text-xs text-slate-400">Controles de mensalidades devidas, faturamentos liquidados e inadimplência.</p>
                </div>
              </div>

              {/* Finance metrics card summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Lançamentos Pagos</span>
                  <span className="text-xl font-black text-green-400">R$ {totalCollected.toFixed(2)}</span>
                  <p className="text-[9px] text-slate-400 mt-1">Total de mensalidades quitadas no sistema</p>
                </div>
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Previsão Pendente / Atrasado</span>
                  <span className="text-xl font-black text-amber-500">R$ {totalPending.toFixed(2)}</span>
                  <p className="text-[9px] text-slate-400 mt-1">Créditos ativos em cobrança</p>
                </div>
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Inadimplentes Ativos</span>
                  <span className="text-xl font-black text-rose-500">
                    {tenantPayments.filter(p => p.status === 'Atrasado').length} Alunos
                  </span>
                  <p className="text-[9px] text-slate-400 mt-1">Catraca bloqueará acesso automaticamente.</p>
                </div>
              </div>

              {/* Invoice List */}
              <div className="bg-slate-950 rounded-xl border border-slate-850 overflow-hidden">
                <div className="p-4 bg-slate-900/60 border-b border-slate-850 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Histórico de Cobranças</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[11px]">Filtrar:</span>
                    <select 
                      value={paymentFilter}
                      onChange={e => setPaymentFilter(e.target.value)}
                      className="text-[10px] bg-slate-950 border border-slate-800 rounded p-1 text-white focus:outline-none"
                    >
                      <option value="Todos">Todas as boletas</option>
                      <option value="Pago">Apenas Pagas</option>
                      <option value="Pendente">Apenas Pendentes</option>
                      <option value="Atrasado">Apenas Atrasadas</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/40 text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-850">
                      <tr>
                        <th className="p-4">Aluno Responsável</th>
                        <th className="p-4">Vencimento</th>
                        <th className="p-4">Valor Cobrado</th>
                        <th className="p-4">Forma de Pgto</th>
                        <th className="p-4">Status Fatura</th>
                        <th className="p-4 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-slate-300">
                      {tenantPayments
                        .filter(p => {
                          if (paymentFilter === 'Todos') return true;
                          return p.status === paymentFilter;
                        })
                        .map(p => {
                          let payBadge = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                          if (p.status === 'Pendente') payBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                          if (p.status === 'Atrasado') payBadge = 'bg-rose-500/10 text-rose-400 border-rose-500/20';

                          return (
                            <tr key={p.id} className="hover:bg-slate-900/25 transition">
                              <td className="p-4 font-bold text-white">
                                {p.studentName}
                              </td>
                              <td className="p-4 font-mono font-semibold">
                                {p.dueDate}
                              </td>
                              <td className="p-4 font-bold text-indigo-300">
                                R$ {p.amount.toFixed(2)}
                              </td>
                              <td className="p-4">
                                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] border border-slate-800">
                                  {p.method}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${payBadge}`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                {p.status !== 'Pago' ? (
                                  <button 
                                    onClick={() => handlePaymentSettle(p.id)}
                                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] rounded transition focus:outline-none cursor-pointer"
                                  >
                                    Quitar Fatura (Confirmar Pix)
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-slate-500 font-semibold">
                                    Pago em {p.paymentDate} ✓
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: TURMAS & CHECK-INS (AGENDA DE TREINOS) */}
          {activeTab === 'turmas' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white">Gestão de Turmas & Horários</h1>
                <p className="text-xs text-slate-400">Lista de aulas diárias presenciais, lotação máxima e controle de reservas.</p>
              </div>

              {/* Grid block of available classes for staff monitor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {tenantClasses.map(cls => {
                  const checkins = state.bookings.filter(b => b.classId === cls.id && b.tenantId === tenant.id);
                  const isTeacher = activePersona === 'Professor';

                  return (
                    <div key={cls.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                      
                      <div className="flex justify-between items-start border-b border-slate-900 pb-3">
                        <div>
                          <span className="text-[9px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                            {cls.category}
                          </span>
                          <h3 className="text-base font-bold text-white mt-1">{cls.name}</h3>
                          <span className="text-xs text-slate-400 block">{cls.instructor}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-200 block">{cls.time}</span>
                          <span className="text-[10px] text-slate-500 block">{cls.days.join(', ')}</span>
                        </div>
                      </div>

                      {/* Seat Occupancy block indicator */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Capacidade da sala</span>
                          <span className="font-bold text-white">{cls.enrolled} / {cls.capacity} Alunos</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-indigo-500 h-full rounded-full transition-all" 
                            style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Display daily list of actual bookings inside class */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Lista de Presença do Dia</span>
                        
                        <div className="space-y-1.5">
                          {checkins.length > 0 ? (
                            checkins.map(ch => (
                              <div key={ch.id} className="p-2.5 bg-slate-900 rounded-lg flex justify-between items-center border border-slate-850">
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                                  <span className="text-xs font-bold text-white leading-none whitespace-nowrap overflow-hidden max-w-[140px] truncate">{ch.studentName}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 p-1 rounded">
                                    {ch.status}
                                  </span>
                                  {isTeacher && (
                                    <button 
                                      className="text-[9px] text-rose-400 hover:underline px-1 focus:outline-none"
                                      onClick={() => onMarkPaymentPaid(ch.id)} // mock delete for demo
                                    >
                                      Falta
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-[11px] text-slate-500 italic">Nenhum check-in confirmado para hoje.</p>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}

              </div>

            </div>
          )}

          {/* TAB 6: AUTOMAÇÕES WHATSAPP */}
          {activeTab === 'campanhas' && activePersona === 'Dono' && modules.campanhas && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white">Disparos de WhatsApp & Automações</h1>
                <p className="text-xs text-slate-400">Automatize contatos com alunos em débito, faça relances ou estimule ausentes a treinar.</p>
              </div>

              {/* Campaign cards trigger block */}
              <div className="space-y-4">
                {tenantCampaigns.map(cp => (
                  <div key={cp.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
                    
                    <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          Gatilho: {cp.triggerType}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1.5">{cp.name}</h3>
                        <p className="text-xs text-slate-500">Canal: 🚀 WhatsApp Direct Line</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total já enviado</span>
                        <span className="text-lg font-black text-white">{cp.sentCount} disparos</span>
                      </div>
                    </div>

                    {/* Template editable mock preview */}
                    <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl space-y-2">
                      <span className="text-[9px] text-emerald-400 font-extrabold uppercase font-mono tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Conteúdo do Template
                      </span>
                      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-3 rounded border border-slate-900">
                        {cp.templateText}
                      </p>
                      <p className="text-[10px] text-slate-600 italic">Tags dinâmicas como {"{aluno_nome}"} são substituídas com os dados do banco de dados na hora do envio.</p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={() => handleTriggerAutomation(cp)}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition focus:outline-none cursor-pointer"
                      >
                        <Send className="w-4 h-4" /> Simular Envio de Campanha
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 7: STAFF / TEAM */}
          {activeTab === 'equipe' && activePersona === 'Dono' && modules.equipe && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white">Equipe de Colaboradores</h1>
                <p className="text-xs text-slate-400">Controle de acessos diferenciados para gerentes, recepção e professores do studio.</p>
              </div>

              {/* Team list card grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tenantTeam.map(tm => (
                  <div key={tm.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-4">
                    <img src={tm.avatarUrl} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/20" alt="" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block">{tm.name}</span>
                      <span className="text-[10px] text-indigo-400 uppercase font-bold font-mono">{tm.role}</span>
                      <span className="text-[10px] text-slate-500 block">{tm.email}</span>
                      <span className="text-[10px] text-slate-500 block">{tm.phone}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Plans tier lists showing branding override items */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4 mt-8">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest pb-2 border-b border-slate-900">Configuração de Planos Habilitados</h3>
                <p className="text-xs text-slate-400">Estes são seus planos atuais cadastrados no banco de dados, vinculados à página de check-out do aluno:</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {tenantPlans.map(pl => (
                    <div key={pl.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase block">{pl.period}</span>
                      <h4 className="text-sm font-bold text-white">{pl.name}</h4>
                      <span className="text-base font-bold text-white">R$ {pl.price.toFixed(2)}</span>
                      <ul className="space-y-1.5 border-t border-slate-850/80 pt-3">
                        {pl.features.map((ft, ftIdx) => (
                          <li key={ftIdx} className="text-[10px] text-slate-400 flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-indigo-500 rounded-full" /> {ft}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}

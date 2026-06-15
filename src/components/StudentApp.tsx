/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tenant, Student, FitnessClass, Booking, AppState } from '../types';
import { 
  Dumbbell, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  CreditCard,
  MessageSquare,
  QrCode,
  Users,
  ChevronRight,
  Sparkles,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface StudentAppProps {
  state: AppState;
  onAddBooking: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onRenewPlan: (studentId: string) => void;
}

export default function StudentApp({ state, onAddBooking, onCancelBooking, onRenewPlan }: StudentAppProps) {
  // Find current active tenant
  const tenant = state.tenants.find(t => t.id === state.currentTenantId) || state.tenants[0];
  
  // Custom theme colors for inline injection
  const primaryColor = tenant.primaryColor;
  
  // Filter students for this tenant and select a primary "dummy" active student profile to model
  const tenantStudents = state.students.filter(s => s.tenantId === tenant.id);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    tenantStudents[0]?.id || 'std-1'
  );

  const student = state.students.find(s => s.id === selectedStudentId) || state.students[0];

  // If no student exists, fallback mock
  const activeStudent: Student = student || {
    id: 'std-custom',
    tenantId: tenant.id,
    name: 'Visitante Desconhecido',
    email: 'user@gymflow.com',
    phone: '(11) 90000-0000',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    status: 'Ativo',
    planId: 'iron-gold',
    registrationDate: '2025-01-01',
    nextBillingDate: '2026-07-20',
    attendanceRate: 85,
    totalCheckins: 42
  };

  const studentPlan = state.plans.find(p => p.id === activeStudent.planId) || state.plans[0];
  
  // Filter classes belonging to this tenant
  const tenantClasses = state.classes.filter(c => c.tenantId === tenant.id);
  
  // Filter student bookings
  const studentBookings = state.bookings.filter(b => b.studentId === activeStudent.id && b.tenantId === tenant.id);

  // QR Code visualization state
  const [showQrCode, setShowQrCode] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const handleApplyCheckin = (classItem: FitnessClass) => {
    // Check if limit reached
    if (classItem.enrolled >= classItem.capacity) {
      setErrorMsg('Turma com lotação esgotada! Cadastre-se na lista de espera.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    // Check if already booked
    const alreadyBooked = studentBookings.some(b => b.classId === classItem.id);
    if (alreadyBooked) {
      setErrorMsg('Você já garantiu seu check-in ativo para esta atividade.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    const newBooking: Booking = {
      id: `b-new-${Date.now()}`,
      tenantId: tenant.id,
      studentId: activeStudent.id,
      studentName: activeStudent.name,
      classId: classItem.id,
      className: classItem.name,
      date: new Date().toLocaleDateString('pt-BR'),
      time: classItem.time.split(' ')[0],
      status: 'Check-in Realizado'
    };

    onAddBooking(newBooking);
    setBookingSuccessMsg(`Sua vaga em "${classItem.name}" foi confirmada! Check-in gerado.`);
    setTimeout(() => setBookingSuccessMsg(''), 4500);
  };

  const handleCancelCheckin = (bookingId: string) => {
    setConfirmCancelId(bookingId);
  };

  const executeConfirmCancel = () => {
    if (confirmCancelId) {
      onCancelBooking(confirmCancelId);
      setConfirmCancelId(null);
      setBookingSuccessMsg('Check-in cancelado e vaga disponibilizada com sucesso!');
      setTimeout(() => setBookingSuccessMsg(''), 4000);
    }
  };

  const handleRenewalTrigger = () => {
    onRenewPlan(activeStudent.id);
    setBookingSuccessMsg(`🎉 Plano "${studentPlan?.name}" renovado com sucesso! Cobrança liquidada via Pix.`);
    setTimeout(() => setBookingSuccessMsg(''), 5000);
  };

  return (
    <div id="student-app-root" className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4">
      
      {/* Simulation Persona Selector */}
      <div className="max-w-md mx-auto mb-6 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col gap-2 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Ambiente de Simulação de Aluno</span>
          <span className="text-[10px] text-rose-500 font-bold font-mono">PWA Mobile View</span>
        </div>
        <p className="text-[11px] text-slate-400">Alternar aluno do <strong>{tenant.name}</strong> para ver informações de planos distintos:</p>
        <select 
          value={selectedStudentId}
          onChange={e => setSelectedStudentId(e.target.value)}
          className="text-xs w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none"
        >
          {tenantStudents.length > 0 ? (
            tenantStudents.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.status})</option>
            ))
          ) : (
            <option value="std-default">Nenhum aluno cadastrado nesta academia</option>
          )}
        </select>
      </div>

      {/* Main simulated phone container style */}
      <div className="max-w-md mx-auto bg-slate-900 rounded-[32px] border-4 border-slate-800 shadow-2xl overflow-hidden relative flex flex-col min-h-[780px]">
        
        {/* Dynamic color header backdrop */}
        <div 
          className="p-6 pb-20 relative transition-all"
          style={{ backgroundImage: `linear-gradient(to bottom, ${primaryColor}22, #0f172a)` }}
        >
          {/* Header row */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {tenant.logoText ? tenant.logoText[0] : 'G'}
              </div>
              <span className="font-extrabold text-sm text-white tracking-tight uppercase">
                {tenant.logoText || tenant.name}
              </span>
            </div>
            
            <button 
              onClick={() => setShowQrCode(!showQrCode)}
              className="p-2 bg-slate-800/80 rounded-full border border-slate-700 text-slate-200 hover:text-white transition focus:outline-none relative"
              title="Acesso via QR Code"
            >
              <QrCode className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </button>
          </div>

          {/* Student Profile Info */}
          <div className="flex items-center gap-3">
            <img 
              src={activeStudent.avatarUrl} 
              alt={activeStudent.name} 
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: primaryColor }}
            />
            <div>
              <p className="text-xs text-slate-400">Olá, bem-vindo de volta!</p>
              <h1 className="text-lg font-bold text-white leading-tight">{activeStudent.name}</h1>
              <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Cadastro {activeStudent.status}
              </span>
            </div>
          </div>
        </div>

        {/* Floating QR Modal if open */}
        {showQrCode && (
          <div className="absolute inset-0 bg-slate-950/95 z-50 p-6 flex flex-col justify-center items-center text-center animate-fadeIn">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Entrada Liberada</span>
            <h2 className="text-base font-bold text-white mb-6">Aproxime do leitor da catraca</h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-slate-800 mb-6">
              {/* Simulated visual QR Code design */}
              <div className="w-48 h-48 bg-slate-100 flex flex-col justify-between p-2 relative">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-slate-900" />
                    <div className="w-4 h-4 bg-slate-950" />
                    <div className="w-10 h-10 border-4 border-slate-900" />
                  </div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dumbbell className="w-10 h-10 text-rose-600 animate-spin" />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6">
              Token atualizado em tempo real. Válido por mais <strong>45 segundos</strong>.
            </p>
            
            <button 
              onClick={() => setShowQrCode(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition"
            >
              Fechar Código de Acesso
            </button>
          </div>
        )}

        {/* Content body overlap */}
        <div className="bg-slate-900 px-4 pb-8 space-y-6 flex-1 -mt-12 z-10 rounded-t-[28px] pt-6 overflow-y-auto">
          
          {/* Action result message banner */}
          {bookingSuccessMsg && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold animate-fadeIn">
              {bookingSuccessMsg}
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold animate-fadeIn">
              ⚠️ {errorMsg}
            </div>
          )}

          {confirmCancelId && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 space-y-3 animate-fadeIn">
              <p className="text-xs font-bold leading-relaxed">Deseja realmente desmarcar esse check-in presencial? Isso liberará a vaga para outros alunos.</p>
              <div className="flex gap-2">
                <button 
                  onClick={executeConfirmCancel}
                  className="px-3 py-1.5 bg-amber-500 text-black text-xs font-black rounded-lg transition hover:bg-amber-400"
                >
                  Confirmar Cancelamento
                </button>
                <button 
                  onClick={() => setConfirmCancelId(null)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition hover:bg-slate-700"
                >
                  Manter Check-in
                </button>
              </div>
            </div>
          )}

          {/* Core Plan Status Box */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Seu Plano Ativo</span>
              <span className="text-xs text-slate-400 font-medium">Vence em: <strong>{activeStudent.nextBillingDate}</strong></span>
            </div>
            
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-black text-white">{studentPlan?.name || 'Plano Personalizado'}</h3>
              <span className="text-sm font-bold text-slate-300">R$ {studentPlan?.price.toFixed(2)}/mês</span>
            </div>

            <div className="flex gap-2 justify-stretch pt-2 border-t border-slate-900 pt-3">
              <button 
                onClick={handleRenewalTrigger}
                className="flex-1 py-2 px-3 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 cursor-pointer transition text-center"
                style={{ backgroundColor: primaryColor }}
              >
                <CreditCard className="w-3.5 h-3.5" /> Renovar no Pix
              </button>
              <a
                href={`https://wa.me/${tenant.phone?.replace(/\D/g, '') || '5511999999999'}?text=Olá,%20gostaria%20de%20tirar%20uma%20duvida%20sobre%20meu%20plano%20na%20academia`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition border border-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Custom Streak circles (Frequência operacional) */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Presenças Acumuladas
                </h4>
                <p className="text-[10px] text-slate-500">Mantenha a constância ativa nos treinos</p>
              </div>
              <span className="text-xl font-black text-white font-mono">{activeStudent.totalCheckins} 🏋️‍♂️</span>
            </div>

            {/* Simulated week circles block */}
            <div className="grid grid-cols-7 gap-2 pt-1">
              {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, dIdx) => {
                const checked = dIdx < 4; // visual simulated presence check-ins
                return (
                  <div key={dIdx} className="text-center space-y-1">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                        checked 
                          ? 'text-white border-transparent' 
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                      style={checked ? { backgroundColor: primaryColor } : {}}
                    >
                      {checked ? '✓' : day}
                    </div>
                    <span className="text-[9px] text-slate-500">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscribed direct Classes / Booking List */}
          {studentBookings.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Suas Reservas de Hoje</span>
              
              <div className="space-y-1.5">
                {studentBookings.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-slate-900 text-slate-300">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{b.className}</h5>
                        <p className="text-[10px] text-slate-500">{b.date} às {b.time}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCancelCheckin(b.id)}
                      className="px-2.5 py-1 text-[10px] text-red-400 bg-red-400/10 hover:bg-red-400/20 border border-red-500/20 rounded font-bold transition focus:outline-none cursor-pointer"
                    >
                      Desmarcar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Available Classes Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">GRADE DE TURMAS (Hoje)</span>
              <span className="text-[9px] text-slate-500">Agende abaixo</span>
            </div>

            <div className="space-y-2">
              {tenantClasses.length > 0 ? (
                tenantClasses.map((cls) => {
                  const isEnrolled = studentBookings.some(b => b.classId === cls.id);
                  const isFull = cls.enrolled >= cls.capacity;

                  return (
                    <div 
                      key={cls.id} 
                      className="p-3 bg-slate-950 rounded-xl border border-slate-850 hover:border-slate-800 transition flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">{cls.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[8px] text-slate-400 font-medium">
                            {cls.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">Instrutor: {cls.instructor}</p>
                        
                        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" /> {cls.time}
                          </span>
                          <span>•</span>
                          <span>{cls.days.join(', ')}</span>
                          <span>•</span>
                          <span className="text-slate-400">{cls.enrolled}/{cls.capacity} vagas</span>
                        </div>
                      </div>

                      <div>
                        {isEnrolled ? (
                          <span className="px-2.5 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded block text-center border border-emerald-500/20">
                            Confirmado
                          </span>
                        ) : isFull ? (
                          <span className="px-2 py-1 bg-slate-900 text-slate-600 text-[10px] font-bold rounded block">
                            Esgotado
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleApplyCheckin(cls)}
                            className="px-3 py-1.5 text-[10px] font-bold rounded text-white transition focus:outline-none cursor-pointer"
                            style={{ backgroundColor: primaryColor }}
                          >
                            Agendar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-500 italic text-center p-4">Nenhuma turma com check-in disponível hoje para esta unidade.</p>
              )}
            </div>
          </div>

          {/* Communications / Announcements Board */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quadro de Avisos</h4>
            <div className="divide-y divide-slate-900 space-y-2.5">
              <div className="space-y-1 pt-2.5">
                <span className="text-[9px] text-rose-400 font-bold uppercase">🚨 Novo Horário</span>
                <p className="text-xs font-bold text-slate-200">Cronograma de Feriado Corpus Christi</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">Na quinta-feira funcionaremos de 08:30 às 13h apenas. Nossos planos funcionam normal.</p>
              </div>
              <div className="space-y-1 pt-2.5">
                <span className="text-[9px] text-indigo-400 font-bold uppercase">🏆 Evento Interno</span>
                <p className="text-xs font-bold text-slate-200">Desafio de CrossFit WOD 2026</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">Inscrições abertas na secretaria. Participe no sábado!</p>
              </div>
            </div>
          </div>

          {/* Simulated address and phone */}
          <div className="py-4 text-center border-t border-slate-900 space-y-1">
            <p className="text-[10px] text-slate-500">{tenant.address}</p>
            <p className="text-[9px] text-slate-600 font-mono">Contato: {tenant.phone} • Powered by GymFlow CRM</p>
          </div>

        </div>

      </div>
    </div>
  );
}

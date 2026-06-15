/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppState, Tenant, Student, Lead, Plan, FitnessClass, Booking, Payment, TeamMember, MarketingCampaign } from './types';
import { getInitialState, saveState } from './data';
import LandingPage from './components/LandingPage';
import SuperAdmin from './components/SuperAdmin';
import StudentApp from './components/StudentApp';
import ManagerDashboard from './components/ManagerDashboard';
import { 
  Monitor, 
  Smartphone, 
  UserCheck, 
  Settings, 
  RefreshCw, 
  Sliders, 
  Info,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // Load unified persistent state from localStorage/seed
  const [appState, setAppState] = useState<AppState>(() => getInitialState());
  
  // Current visible area: 'landing' (sales page) | 'manager' (dashboard) | 'student' (app) | 'admin' (white-label)
  const [activeArea, setActiveArea] = useState<'landing' | 'manager' | 'student' | 'admin'>('landing');

  // Sync back to local storage whenever state changes
  useEffect(() => {
    saveState(appState);
  }, [appState]);

  // Find the currently active tenant
  const activeTenant = appState.tenants.find(t => t.id === appState.currentTenantId) || appState.tenants[0];

  // STAGE HANDLERS

  // Update a single Tenant branding/modules configuration
  const handleUpdateTenant = (updatedTenant: Tenant) => {
    setAppState(prev => {
      const updatedTenants = prev.tenants.map(t => t.id === updatedTenant.id ? updatedTenant : t);
      return {
        ...prev,
        tenants: updatedTenants
      };
    });
  };

  // Switch between tenants / physical locations
  const handleSelectTenant = (tenantId: string) => {
    setAppState(prev => ({
      ...prev,
      currentTenantId: tenantId
    }));
  };

  // Register a brand new tenant contract (White-label enrollment)
  const handleAddNewTenant = (newTenant: Tenant) => {
    setAppState(prev => {
      // Prevent duplicates
      if (prev.tenants.some(t => t.id === newTenant.id)) return prev;
      
      return {
        ...prev,
        tenants: [...prev.tenants, newTenant]
      };
    });
  };

  // Add new lead in CRM
  const handleAddLead = (newLead: Lead) => {
    setAppState(prev => ({
      ...prev,
      leads: [newLead, ...prev.leads]
    }));
  };

  // Modify lead stage in pipeline
  const handleUpdateLeadStatus = (leadId: string, status: Lead['status']) => {
    setAppState(prev => {
      const updatedLeads = prev.leads.map(l => l.id === leadId ? { ...l, status } : l);
      return {
        ...prev,
        leads: updatedLeads
      };
    });
  };

  // Add new official student profile
  const handleAddStudent = (newStudent: Student) => {
    setAppState(prev => ({
      ...prev,
      students: [newStudent, ...prev.students]
    }));
  };

  // Change student enrollment lifecycle status
  const handleUpdateStudentStatus = (studentId: string, status: Student['status']) => {
    setAppState(prev => {
      const updatedStudents = prev.students.map(s => s.id === studentId ? { ...s, status } : s);
      return {
        ...prev,
        students: updatedStudents
      };
    });
  };

  // Add scheduled classes bookings / check-ins
  const handleAddBooking = (newBooking: Booking) => {
    setAppState(prev => {
      // Increment enrolled count on the matched class
      const updatedClasses = prev.classes.map(c => {
        if (c.id === newBooking.classId) {
          return { ...c, enrolled: Math.min(c.capacity, c.enrolled + 1) };
        }
        return c;
      });

      // Increment student check-in counters
      const updatedStudents = prev.students.map(s => {
        if (s.id === newBooking.studentId) {
          return {
            ...s,
            totalCheckins: s.totalCheckins + 1,
            attendanceRate: Math.min(100, Math.round(((s.totalCheckins + 1) / 120) * 100))
          };
        }
        return s;
      });

      return {
        ...prev,
        bookings: [newBooking, ...prev.bookings],
        classes: updatedClasses,
        students: updatedStudents
      };
    });
  };

  // Remove check-in booking
  const handleCancelBooking = (bookingId: string) => {
    const bookingToRemove = appState.bookings.find(b => b.id === bookingId);
    if (!bookingToRemove) return;

    setAppState(prev => {
      // Decrement class count
      const updatedClasses = prev.classes.map(c => {
        if (c.id === bookingToRemove.classId) {
          return { ...c, enrolled: Math.max(0, c.enrolled - 1) };
        }
        return c;
      });

      // Decrement student count
      const updatedStudents = prev.students.map(s => {
        if (s.id === bookingToRemove.studentId) {
          return {
            ...s,
            totalCheckins: Math.max(0, s.totalCheckins - 1),
            attendanceRate: Math.max(0, Math.round((Math.max(0, s.totalCheckins - 1) / 120) * 100))
          };
        }
        return s;
      });

      return {
        ...prev,
        bookings: prev.bookings.filter(b => b.id !== bookingId),
        classes: updatedClasses,
        students: updatedStudents
      };
    });
  };

  // Set-up recurring payments
  const handleAddPayment = (newPayment: Payment) => {
    setAppState(prev => ({
      ...prev,
      payments: [newPayment, ...prev.payments]
    }));
  };

  const handleMarkPaymentPaid = (paymentId: string) => {
    setAppState(prev => {
      const updatedPayments = prev.payments.map(p => {
        if (p.id === paymentId) {
          return {
            ...p,
            status: 'Pago' as const,
            paymentDate: new Date().toLocaleDateString('pt-BR'),
            method: 'Pix' as const
          };
        }
        return p;
      });

      // If the matched student had a pending status, set them back to 'Ativo'!
      const paymentObj = prev.payments.find(p => p.id === paymentId);
      let updatedStudents = prev.students;
      if (paymentObj) {
        updatedStudents = prev.students.map(s => {
          if (s.id === paymentObj.studentId && s.status === 'Pendente') {
            return { ...s, status: 'Ativo' as const };
          }
          return s;
        });
      }

      return {
        ...prev,
        payments: updatedPayments,
        students: updatedStudents
      };
    });
  };

  // Student plan update
  const handleRenewStudentPlan = (studentId: string) => {
    setAppState(prev => {
      const updatedStudents = prev.students.map(s => {
        if (s.id === studentId) {
          // Push expire date for another 30 days
          const cleanDate = new Date();
          cleanDate.setDate(cleanDate.getDate() + 30);
          return {
            ...s,
            status: 'Ativo' as const,
            nextBillingDate: cleanDate.toISOString().split('T')[0]
          };
        }
        return s;
      });

      return {
        ...prev,
        students: updatedStudents
      };
    });
  };

  const handleTriggerCampaignMessage = (campaignId: string) => {
    setAppState(prev => {
      const updatedCampaigns = prev.campaigns.map(c => {
        if (c.id === campaignId) {
          return {
            ...c,
            sentCount: c.sentCount + 1,
            conversionCount: c.conversionCount + Math.floor(Math.random() * 2)
          };
        }
        return c;
      });
      return {
        ...prev,
        campaigns: updatedCampaigns
      };
    });
  };

  // Reset the demo database (clear local storage and seed fresh)
  const handleResetDatabase = () => {
    if (confirm('Deseja restaurar as configurações originais do sistema? Isso limpará todas as suas edições locais e redefinirá os dados piloto do SaaS.')) {
      localStorage.removeItem('gymflow_saas_state_v1');
      window.location.reload();
    }
  };

  return (
    <div id="gymflow-applet-main" className="relative min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans">
      
      {/* Dynamic Multi-tenant configuration indicator on top of screen */}
      <div className="bg-[#121212] border-b border-[#27272A] px-4 py-2 flex flex-wrap justify-between items-center text-xs text-zinc-400 gap-4 z-40 relative">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#BEF264]" />
          <span className="font-semibold text-zinc-200">Ambiente Demonstrativo SaaS:</span>
          <span>Troque as telas livremente usando o menu flutuante abaixo para conferir o MVP!</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
            <span>Subdomínio Ativo:</span>
            <span className="text-[#BEF264] font-bold bg-[#BEF264]/10 px-1.5 py-0.5 rounded border border-[#BEF264]/20">
              {activeTenant.domain}
            </span>
          </div>
          <button 
            type="button"
            onClick={handleResetDatabase}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition focus:outline-none cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Restaurar BD Demo
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE SCREEN */}
      <div className="pb-28">
        {activeArea === 'landing' && (
          <LandingPage onEnterApp={(area) => setActiveArea(area)} />
        )}
        {activeArea === 'admin' && (
          <SuperAdmin 
            state={appState} 
            onUpdateTenant={handleUpdateTenant}
            onSelectTenant={handleSelectTenant}
            onAddNewTenant={handleAddNewTenant}
          />
        )}
        {activeArea === 'student' && (
          <StudentApp 
            state={appState} 
            onAddBooking={handleAddBooking}
            onCancelBooking={handleCancelBooking}
            onRenewPlan={handleRenewStudentPlan}
          />
        )}
        {activeArea === 'manager' && (
          <ManagerDashboard 
            state={appState}
            onUpdateTenant={handleUpdateTenant}
            onAddStudent={handleAddStudent}
            onUpdateStudentStatus={handleUpdateStudentStatus}
            onAddLead={handleAddLead}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onAddPayment={handleAddPayment}
            onMarkPaymentPaid={handleMarkPaymentPaid}
            onTriggerCampaign={handleTriggerCampaignMessage}
          />
        )}
      </div>

      {/* FLOATING SIMULATOR TAB BRIDGING BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#09090BBF] backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-[#27272A] z-50 flex items-center justify-between gap-6 max-w-lg w-[90%] md:w-auto">
        
        <div className="hidden md:flex flex-col text-left shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-[#BEF264] font-black">Navegar no MVP</span>
          <span className="text-[11px] text-white font-bold leading-none">GymFlow SaaS</span>
        </div>

        {/* Areas toggle triggers */}
        <div className="flex flex-1 justify-around md:-ml-2 gap-1.5">
          {[
            { id: 'landing' as const, label: '1. Landing Page', icon: Monitor },
            { id: 'manager' as const, label: '2. Painel Gestor', icon: UserCheck },
            { id: 'student' as const, label: '3. Web App Aluno', icon: Smartphone },
            { id: 'admin' as const, label: '4. White-Label / Admin', icon: Settings },
          ].map((screen) => {
            const Selected = activeArea === screen.id;
            const IconComponent = screen.icon;
            
            return (
              <button
                key={screen.id}
                onClick={() => setActiveArea(screen.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  Selected 
                    ? 'bg-[#BEF264] text-black shadow-lg shadow-[#BEF264]/20 font-black scale-102' 
                    : 'bg-[#121212] text-zinc-400 hover:text-white border border-[#27272A]'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline-block">{screen.label}</span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}

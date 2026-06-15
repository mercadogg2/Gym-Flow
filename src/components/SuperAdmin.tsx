/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tenant, AppState } from '../types';
import { 
  Sliders, 
  Palette, 
  Settings, 
  Grid, 
  Save, 
  Building, 
  RefreshCw, 
  Activity, 
  CreditCard,
  Layers,
  Database,
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react';

interface SuperAdminProps {
  state: AppState;
  onUpdateTenant: (updatedTenant: Tenant) => void;
  onSelectTenant: (tenantId: string) => void;
  onAddNewTenant: (newTenant: Tenant) => void;
}

export default function SuperAdmin({ state, onUpdateTenant, onSelectTenant, onAddNewTenant }: SuperAdminProps) {
  const [selectedId, setSelectedId] = useState<string>(state.currentTenantId);
  const [successMsg, setSuccessMsg] = useState('');
  const [name, setName] = useState<string>('');
  const [logoText, setLogoText] = useState<string>('');
  const [primaryColor, setPrimaryColor] = useState<string>('');
  const [secondaryColor, setSecondaryColor] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  // Modules state
  const [modules, setModules] = useState<Tenant['activeModules']>({
    leads: true,
    relatorios: true,
    campanhas: true,
    autonacoes: true,
    equipe: true,
    checkins: true,
    financeiro: true,
  });

  // Creator state
  const [isCreating, setIsCreating] = useState(false);
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');

  // Load active tenant values when changed
  const currentTenant = state.tenants.find(t => t.id === selectedId) || state.tenants[0];

  React.useEffect(() => {
    if (currentTenant) {
      setName(currentTenant.name);
      setLogoText(currentTenant.logoText || currentTenant.name);
      setPrimaryColor(currentTenant.primaryColor);
      setSecondaryColor(currentTenant.secondaryColor);
      setAddress(currentTenant.address);
      setPhone(currentTenant.phone);
      setEmail(currentTenant.email);
      setModules({ ...currentTenant.activeModules });
    }
  }, [selectedId, currentTenant]);

  const handleSave = () => {
    if (!currentTenant) return;
    
    const updated: Tenant = {
      ...currentTenant,
      name,
      logoText,
      primaryColor,
      secondaryColor,
      address,
      phone,
      email,
      activeModules: modules
    };
    
    onUpdateTenant(updated);
    setSuccessMsg(`Configurações de Branding e Módulos para "${name}" salvas com sucesso!`);
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  const handleModuleToggle = (key: keyof Tenant['activeModules']) => {
    setModules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newName) return;
    
    const cleanId = newId.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const newTenant: Tenant = {
      id: cleanId,
      name: newName,
      domain: `${cleanId}.gymflow.com.br`,
      logoType: 'text',
      logoText: newName.toUpperCase(),
      primaryColor: '#f43f5e', // Default rose
      secondaryColor: '#0f172a',
      activeModules: {
        leads: true,
        relatorios: true,
        campanhas: true,
        autonacoes: true,
        equipe: true,
        checkins: true,
        financeiro: true,
      },
      address: 'Endereço Comercial da Nova Academia',
      phone: '(11) 90000-0000',
      email: `suporte@${cleanId}.com.br`
    };

    onAddNewTenant(newTenant);
    setSelectedId(cleanId);
    setIsCreating(false);
    setNewId('');
    setNewName('');
    setSuccessMsg(`Parabéns! Nova academia "${newName}" foi criada com sucesso no modelo white-label.`);
    setTimeout(() => setSuccessMsg(''), 5500);
  };

  // Preset Colors for demo
  const colorPresets = [
    { primary: '#e11d48', secondary: '#0f172a', name: 'Rose / Iron' },
    { primary: '#0d9488', secondary: '#f0fdfa', name: 'Zen Teal / Mint' },
    { primary: '#8b5cf6', secondary: '#1e1b4b', name: 'Combat Violet' },
    { primary: '#f59e0b', secondary: '#1e293b', name: 'Amber Energy' },
    { primary: '#10b981', secondary: '#064e3b', name: 'Active Green' },
    { primary: '#3b82f6', secondary: '#0f172a', name: 'Cyber Blue' },
    { primary: '#ec4899', secondary: '#171717', name: 'Pink Studio' },
  ];

  // Calculate generic super KPIs
  const totalSubscribers = state.students.length;
  const estimatedBilling = state.students.filter(s => s.status === 'Ativo').reduce((acc, cr) => {
    // find plan price
    const plan = state.plans.find(p => p.id === cr.planId);
    return acc + (plan?.price || 99.90);
  }, 0);

  return (
    <div id="super-admin-view" className="bg-slate-900 text-slate-100 min-h-screen p-4 sm:p-8">
      
      {/* SaaS Success Notifications */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-55 max-w-sm bg-slate-950 border-2 border-[#BEF264] rounded-xl p-4 shadow-2xl text-xs leading-relaxed text-slate-200 animate-fadeIn">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264] animate-ping" />
            <span className="font-extrabold uppercase tracking-widest text-[#BEF264] text-[10px]">Super-Admin Logs</span>
          </div>
          <span>{successMsg}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-extrabold font-mono">White-Label & Super Admin</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Central SaaS GymFlow</h1>
            <p className="text-sm text-slate-400 mt-1">Gerencie academias contratantes, ative módulos premium, altere logos e customize paletas de cores.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-rose-600 text-white hover:opacity-95 rounded-xl font-bold text-xs flex items-center gap-1.5 focus:outline-none transition"
            >
              <Plus className="w-4 h-4" /> Nova Academia (Tenant)
            </button>
          </div>
        </div>

        {/* Super KPI Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">Academias Ativas</span>
              <span className="text-2xl font-black text-white">{state.tenants.length} Tenants</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-4">
            <div className="p-3 bg-green-500/10 text-green-400 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">MRR Estimado Saas</span>
              <span className="text-xl font-black text-green-400">R$ {estimatedBilling.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">Alunos Globais</span>
              <span className="text-2xl font-black text-white">{totalSubscribers} cadastradas</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-4">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">Servidor Cloud / BD</span>
              <span className="text-xs font-bold text-slate-300 block">Firewall Ativo</span>
              <span className="text-[10px] text-emerald-400 font-bold font-mono">SQLite / localStorage</span>
            </div>
          </div>
        </div>

        {/* New Tenant Modal Simulator */}
        {isCreating && (
          <form onSubmit={handleCreateTenant} className="bg-slate-950 p-6 rounded-2xl border-2 border-indigo-500/55 animate-fadeIn space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-400" /> Cadastrar Nova Academia Multi-Tenant
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ID Único da Academia (ex: alpha-gym)</label>
                <input 
                  type="text" 
                  value={newId} 
                  onChange={e => setNewId(e.target.value)} 
                  placeholder="Ex: alpha-gym" 
                  required
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nome Comercial da Academia</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  placeholder="Ex: Alpha Fitness Club" 
                  required
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 rounded hover:text-white transition"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold transition"
              >
                Ativar Contrato e Criar Banco
              </button>
            </div>
          </form>
        )}

        {/* Main interactive splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Tenant Selector & Switcher */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academias Contratantes</span>
                <span className="text-[10px] text-slate-500 font-mono">Selecione para editar</span>
              </div>

              <div className="space-y-2">
                {state.tenants.map((t) => {
                  const isActive = t.id === selectedId;
                  const tenantStudents = state.students.filter(s => s.tenantId === t.id);
                  const isSimulatedActive = t.id === state.currentTenantId;

                  return (
                    <div 
                      key={t.id}
                      onClick={() => {
                        setSelectedId(t.id);
                        onSelectTenant(t.id);
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center justify-between ${
                        isActive 
                          ? 'bg-slate-900 border-indigo-500 shadow-md' 
                          : 'bg-slate-950 border-slate-850 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.primaryColor }} />
                          <h4 className="text-sm font-bold text-white leading-tight">{t.name}</h4>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 block">{t.domain}</span>
                        <span className="text-[10px] text-slate-400 block">{tenantStudents.length} alunos cadastrados</span>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1.5">
                        {isSimulatedActive ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-wider">
                            Ativa no App
                          </span>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTenant(t.id);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[9px] font-bold transition focus:outline-none"
                          >
                            Ativar no App
                          </button>
                        )}
                        <span className="text-[9px] text-slate-600">ID: {t.id}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Multi-Tenant explanatory tips */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-indigo-950/20 to-slate-950 space-y-3">
              <h5 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" /> Como o White-Label funciona?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada academia opera de forma independente (banco multi-tenant). 
                Ao clicar em <strong>"Ativar no App"</strong> acima, toda a identidade visual, logo, nome dos planos e módulos ativos do menu lateral do <strong>Painel do Gestor</strong> e da <strong>Área do Aluno</strong> serão re-configurados instantaneamente com a identidade da academia selecionada!
              </p>
            </div>
          </div>

          {/* RIGHT: Tenant Brand and Modules form */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">Configuração Visual (Branding Customizado)</h3>
                </div>
                <span className="text-[11px] font-mono text-indigo-400 uppercase font-black tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded">
                  {currentTenant?.id}
                </span>
              </div>

              {/* Input details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Nome Fantasia da Academia</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Nome da academia"
                    className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Logo Textuaol (Cabeçalho)</label>
                  <input 
                    type="text" 
                    value={logoText} 
                    onChange={e => setLogoText(e.target.value)} 
                    placeholder="Texto do Logotipo"
                    className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500 font-bold"
                  />
                </div>
              </div>

              {/* Theme Colors */}
              <div className="space-y-4">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Cores do Tema (White-Label Styling)</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cor Primária (Hexadecimal)</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={primaryColor} 
                        onChange={e => setPrimaryColor(e.target.value)} 
                        className="w-10 h-9 p-0.5 bg-slate-900 border border-slate-850 rounded cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={primaryColor} 
                        onChange={e => setPrimaryColor(e.target.value)} 
                        className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cor Secundária (Fundo / Textura)</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={secondaryColor} 
                        onChange={e => setSecondaryColor(e.target.value)} 
                        className="w-10 h-9 p-0.5 bg-slate-900 border border-slate-850 rounded cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={secondaryColor} 
                        onChange={e => setSecondaryColor(e.target.value)} 
                        className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Color presets quick click */}
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Predefinições de Imagem</span>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          setPrimaryColor(preset.primary);
                          setSecondaryColor(preset.secondary);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-850 border border-slate-800 text-[10px] flex items-center gap-1.5 text-slate-300 focus:outline-none cursor-pointer"
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.primary }} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Module Toggles */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-t border-slate-900 pt-4">
                  <Grid className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Módulos do Sistema de Software Contratados</h3>
                </div>
                <p className="text-xs text-slate-400">Ative ou desative seções inteiras do painel de controle da academia. Módulos desativados somem do menu da academia contratante (ideal para upsell de planos SaaS!).</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'leads' as const, label: 'CRM Leads & Prospecção', desc: 'Funil de entrada de novos leads e metas' },
                    { key: 'relatorios' as const, label: 'Relatórios Gerenciais', desc: 'KPIs estratégicos de faturamento e churn' },
                    { key: 'campanhas' as const, label: 'Marketing Auto-Notificador', desc: 'Disparos manuais de mensagens no WhatsApp' },
                    { key: 'autonacoes' as const, label: 'Automações Inteligentes', desc: 'Alertas automáticos para alunos inadimplentes/ausentes' },
                    { key: 'equipe' as const, label: 'Controle de Equipes e Staff', desc: 'Diferenciação de login Recepção vs Professores' },
                    { key: 'financeiro' as const, label: 'Controle de Caixa e Boletas', desc: 'Registro de pagamentos, descontos e inadimplência' },
                  ].map((m) => {
                    const active = modules[m.key];
                    return (
                      <div 
                        key={m.key}
                        onClick={() => handleModuleToggle(m.key)}
                        className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-3 select-none ${
                          active 
                            ? 'bg-indigo-950/15 border-indigo-500/55' 
                            : 'bg-slate-900/40 border-slate-850 opacity-60'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={active}
                          onChange={() => {}} // Controlled by Div click
                          className="mt-1 accent-indigo-500 shrink-0 cursor-pointer pointer-events-none"
                        />
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-white block">{m.label}</span>
                          <span className="text-[10px] text-slate-400 block leading-tight">{m.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Physical Contact info */}
              <div className="space-y-4 border-t border-slate-900 pt-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Informações de Contato Adicionais</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">E-mail Administrativo</label>
                    <input 
                      type="text" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      className="w-full text-xs p-2 bg-slate-900 border border-slate-800 rounded font-mono text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">WhatsApp Contato</label>
                    <input 
                      type="text" 
                      value={phone} 
                      onChange={e => setPhone(e.target.value)} 
                      className="w-full text-xs p-2 bg-slate-900 border border-slate-800 rounded font-mono text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Endereço Unidade</label>
                    <input 
                      type="text" 
                      value={address} 
                      onChange={e => setAddress(e.target.value)} 
                      className="w-full text-xs p-2 bg-slate-900 border border-slate-800 rounded text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Save Trigger */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/10 focus:outline-none transition cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Gravar Alterações White-Label
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

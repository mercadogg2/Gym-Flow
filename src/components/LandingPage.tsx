/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  MessageSquare, 
  ChevronRight, 
  Users, 
  DollarSign, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  Star,
  Flame,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: (area: 'manager' | 'student' | 'admin') => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [simAlunos, setSimAlunos] = useState<number>(400);
  const [simTicket, setSimTicket] = useState<number>(130);
  const [simChurn, setSimChurn] = useState<number>(10);
  const [heroTab, setHeroTab] = useState<'kpi' | 'calc'>('kpi');

  const plans = [
    {
      name: 'Start Crescimento',
      description: 'Perfeito para studios iniciantes, salas de pilates ou personal trainers',
      priceMonthly: 199,
      priceAnnual: 149,
      features: [
        'Até 120 alunos ativos',
        'Cadastro rápido de Clientes e Contratos',
        'Check-ins via Aplicativo do Aluno',
        'Controle de Grade de Horários',
        'Mensagens de Cobrança Padrão',
        'Suporte prioritário por E-mail'
      ],
      popular: false,
      cta: 'Iniciar com Start'
    },
    {
      name: 'Vortex GymFlow Pro',
      description: 'O mais vendido. Automação completa de WhatsApp e controle rígido de evasão',
      priceMonthly: 349,
      priceAnnual: 279,
      features: [
        'Alunos ativos Ilimitados',
        'Disparos Automáticos WhatsApp API (Sem Bloqueios)',
        'Área do Aluno Premium com sua marca própria',
        'Funil de Vendas CRM Integrado (Leads de Instagram/Whats)',
        'Módulo Financeiro Automatizado (Pix Recorrente)',
        'Relatórios de Evasão / Aluno Ausente Preditivo',
        'Agenda Interativa de Aulas Coletivas Integrada',
        'Suporte Via WhatsApp em até 15 minutos'
      ],
      popular: true,
      cta: 'Acessar Demonstração Premium Completa'
    },
    {
      name: 'Rede Multi-unidades',
      description: 'Estrutura robusta para bandeiras de academias com mais de uma filial',
      priceMonthly: 599,
      priceAnnual: 479,
      features: [
        'Consolidação Multi-unidade em uma única conta',
        'Branding Customizado e Subdomínios próprios',
        'Módulo Avançado de Comissões de Professores',
        'API aberta de integração de catracas físicas',
        'Gerente Comercial de Sucesso dedicado',
        'Migração de banco de dados antiga 100% gratuita',
        'Desenvolvimento de pequenas features sob demanda'
      ],
      popular: false,
      cta: 'Falar com Especialista'
    }
  ];

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#060608] text-zinc-100 font-sans antialiased selection:bg-[#BEF264] selection:text-black overflow-x-hidden">
      
      {/* Decorative Gradient Blur Orbs */}
      <div className="absolute top-[-100px] left-1/4 w-[600px] h-[600px] bg-[#BEF264]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Interactive SaaS Header notification */}
      <div className="bg-[#121212]/95 border-b border-zinc-800 text-zinc-100 py-3 px-4 text-xs font-semibold text-center sticky top-0 z-50 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-pulse" />
            <strong className="text-white">PROTÓTIPO COMERCIAL INTERATIVO:</strong> Apresente este painel diretamente para donos de academias.
          </span>
          <div className="flex gap-2 mt-1 md:mt-0">
            <button 
              onClick={() => onEnterApp('manager')} 
              className="bg-[#BEF264] text-black px-3 py-1 rounded font-black text-[11px] transform hover:scale-105 transition shadow shadow-black/30"
            >
              [ABRIR PAINEL DO GESTOR]
            </button>
            <button 
              onClick={() => onEnterApp('student')} 
              className="bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1 rounded text-[11px] hover:bg-zinc-700 transition"
            >
              [Simulador App do Aluno]
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar Navigation */}
      <header className="border-b border-zinc-800 bg-[#060608]/80 backdrop-blur-xl z-40 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BEF264] flex items-center justify-center font-black text-black shadow-lg shadow-[#BEF264]/20">
              GF
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block">GymFlow</span>
              <span className="text-[#BEF264] text-[10px] font-extrabold uppercase tracking-widest block -mt-1.5">SaaS de Alta Performance</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <a href="#dores" className="hover:text-white transition">O Problema</a>
            <a href="#beneficios" className="hover:text-white transition">Por que Nós?</a>
            <a href="#modulos" className="hover:text-white transition">CRM & WhatsApp</a>
            <a href="#precos" className="hover:text-white transition">Planos e ROI</a>
            <a href="#faq" className="hover:text-white transition">Dúvidas Comuns</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => onEnterApp('student')}
              className="px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-white transition cursor-pointer"
            >
              Área do Aluno Demo
            </button>
            <button 
              onClick={() => onEnterApp('manager')}
              className="px-5 py-2.5 rounded-xl bg-[#BEF264] text-black font-black text-sm hover:bg-[#aed854] shadow-md hover:shadow-[#BEF264]/20 transition-all duration-300 cursor-pointer"
            >
              Iniciar Apresentação do Painel
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BEF264]/10 border border-[#BEF264]/20 text-[#BEF264] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> GESTÃO DE ACADEMIAS • EXCLUSIVO PARA PROPRIETÁRIOS
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Chega de perder alunos para o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BEF264] to-zinc-400">sumiço silenciosos</span>. Recupere o seu faturamento.
            </h1>

            <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
              O GymFlow junta o melhor CRM de captação, assistente de cobrança no WhatsApp e retenção preditiva. Saiba quem vai cancelar antes que eles desistam, dobre suas renovações e zere a inadimplência no Pix.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onEnterApp('manager')}
                className="px-8 py-4 rounded-xl bg-[#BEF264] text-black font-black text-base hover:bg-[#aed854] shadow-xl shadow-[#BEF264]/15 hover:shadow-[#BEF264]/25 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-transparent"
              >
                Abrir Simulador Gestor Comercial <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <a 
                href="#precos"
                className="px-8 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-bold text-base hover:bg-zinc-900 transition text-center hover:border-zinc-600 block"
              >
                Simular Vazamento de Churn
              </a>
            </div>

            {/* Micro proofs and highlights */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-zinc-850">
              <div>
                <span className="block text-3xl font-black text-[#BEF264]">+42%</span>
                <span className="text-xs text-zinc-300 font-bold block mt-0.5">Renovação de Planos</span>
                <span className="text-[10px] text-zinc-500">Média em acadêmias parceiras</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-[#BEF264]">-50%</span>
                <span className="text-xs text-zinc-300 font-bold block mt-0.5">Inadimplência Real</span>
                <span className="text-[10px] text-zinc-500">Disparos preventivos de faturas</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-[#BEF264]">4.8x</span>
                <span className="text-xs text-zinc-300 font-bold block mt-0.5">Retorno de ROI</span>
                <span className="text-[10px] text-zinc-500">Recuperado já no primeiro mês</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#BEF264]/20 to-zinc-800 rounded-3xl blur-2xl opacity-40 animate-pulse pointer-events-none" />
            
            {/* Redesigned interactive dual tab card */}
            <div className="relative bg-[#121212] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-5">
              
              {/* Header mockup window with live visual toggle */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                
                {/* Visual tabs switcher */}
                <div className="flex bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg text-[10px]">
                  <button 
                    onClick={() => setHeroTab('kpi')}
                    className={`px-2.5 py-1 rounded-md font-bold transition ${
                      heroTab === 'kpi' 
                        ? 'bg-[#BEF264] text-black shadow' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Simulador Alerta
                  </button>
                  <button 
                    onClick={() => setHeroTab('calc')}
                    className={`px-2.5 py-1 rounded-md font-bold transition ${
                      heroTab === 'calc' 
                        ? 'bg-[#BEF264] text-black shadow' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Calcular ROI
                  </button>
                </div>
              </div>

              {heroTab === 'kpi' ? (
                /* Tab 1: Live Alerta Aluno em Risco & Churn Prevention demo */
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-lg border border-[#BEF264]/15">
                    <span className="text-[10px] text-[#BEF264] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264] animate-ping" /> Retenção de Churn Ativa
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Lucas Pinheiro • Ausente 10 dias</span>
                  </div>

                  <div className="bg-[#18181B] p-4 rounded-xl border border-zinc-800 flex gap-3 items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100" 
                      className="w-11 h-11 rounded-full object-cover border border-[#BEF264]" 
                      alt="Lucas" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-white truncate">Lucas Pinheiro Lima</h4>
                      <p className="text-xs text-zinc-400">Plano Silver Real Recorrente • Frequência Alerta (24%)</p>
                    </div>
                  </div>

                  <div className="bg-black p-3 rounded-lg border border-zinc-800 space-y-1.5 shadow-inner">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span className="text-[#BEF264]">💬 Notificação de Resgate Sugerida</span>
                      <span>WhatsApp API Gateway</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 font-mono leading-relaxed">
                      "E aí, Lucas! Vimos que você não vem treinar no Vortex Club há mais de uma semana... Foco nos seus resultados! Deixamos um check-in de treino pronto para você amanhã."
                    </p>
                  </div>

                  <div className="bg-black/20 p-2.5 rounded-lg border border-zinc-900 text-[11px] leading-snug text-zinc-400">
                    💡 <strong>Como funciona na prática:</strong> O sistema detecta o sumiço do Lucas, valida que o plano dele está ativo, e sugere este push para a recepção da academia disparar em 1 clique!
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-emerald-400 font-bold">Taxa de retorno: +42.5%</span>
                    <button 
                      onClick={() => onEnterApp('manager')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition"
                    >
                      Acessar Painel Interativo
                    </button>
                  </div>
                </div>
              ) : (
                /* Tab 2: Premium ROI Calculator (Leakage Estimator) */
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-black/30 p-3 rounded-lg border border-zinc-850">
                    <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Simulador de Vazamento Financeiro de Churn</h5>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-300">Quantidade de Alunos</span>
                          <span className="text-[#BEF264] font-black">{simAlunos}</span>
                        </div>
                        <input 
                          type="range" 
                          min="100" 
                          max="1500" 
                          step="50"
                          value={simAlunos}
                          onChange={(e) => setSimAlunos(Number(e.target.value))}
                          className="w-full accent-[#BEF264]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-300">Ticket Médio Mensal</span>
                          <span className="text-[#BEF264] font-black font-mono">R$ {simTicket}</span>
                        </div>
                        <input 
                          type="range" 
                          min="50" 
                          max="300" 
                          step="10"
                          value={simTicket}
                          onChange={(e) => setSimTicket(Number(e.target.value))}
                          className="w-full accent-[#BEF264]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-300">Taxa de Evasão Mensal (Churn)</span>
                          <span className="text-[#BEF264] font-black font-mono">{simChurn}% ao mês</span>
                        </div>
                        <input 
                          type="range" 
                          min="3" 
                          max="25" 
                          step="1"
                          value={simChurn}
                          onChange={(e) => setSimChurn(Number(e.target.value))}
                          className="w-full accent-[#BEF264]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Calculations breakdown block */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                      <span className="text-[9px] text-red-400 uppercase font-bold block">Vazamento Estimado</span>
                      <span className="text-lg font-mono font-black text-white block mt-0.5">
                        R$ {Math.floor(simAlunos * (simChurn / 100) * simTicket).toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[8px] text-zinc-500 leading-none">jogados fora todo mês por desistências</span>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                      <span className="text-[9px] text-emerald-400 uppercase font-bold block">Salvo com GymFlow</span>
                      <span className="text-lg font-mono font-black text-[#BEF264] block mt-0.5 animate-pulse">
                        + R$ {Math.floor(simAlunos * (simChurn / 100) * simTicket * 0.40).toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[8px] text-zinc-400 leading-none">retidos com reativação recorrente</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-500 text-center leading-snug">
                    Estudo de caso: O GymFlow salva em média 40% das desistências recuperando faturamentos recorrentes e reativando antigos contratos inativos automaticamente.
                  </p>

                  <button 
                    onClick={() => onEnterApp('manager')}
                    className="w-full text-center py-2.5 bg-[#BEF264] hover:bg-[#aed854] text-black font-black text-xs rounded-xl transition"
                  >
                    Simular Recuperação de Churn no Dashboard
                  </button>
                </div>
              )}

              {/* White-Label Theme Color Preview Dot bar bar */}
              <div className="border-t border-zinc-800 pt-3.5 text-center flex items-center justify-between text-[11px] text-zinc-400">
                <span>Personalização Total de Cores</span>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#BEF264] border border-white/20" />
                  <span className="w-3 h-3 rounded-full bg-rose-600" />
                  <span className="w-3 h-3 rounded-full bg-teal-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-violet-600" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PAIN SECTION - SPECIALLY INTRODUCED FOR CONVERSION */}
      <section id="dores" className="py-20 bg-zinc-950 border-t border-zinc-900 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> A realidade silenciosa das academias no Brasil
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">Onde o dinheiro do seu caixa está sumindo?</p>
            <p className="text-zinc-400 text-sm">
              Pesquisas indicam que mais de 65% das falências no mercado fitness ocorrem devido à falta de previsibilidade e baixo índice de retorno pós-teste de novos alunos. Veja se reconhece essas dores:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 border border-zinc-900 p-6 rounded-2xl relative space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-bold">01</div>
              <h3 className="text-lg font-bold text-white">Inadimplência Constrangedora</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Cobrar manualmente no balanço gera constrangimento e atrito com o aluno. Sem notificações automáticas, dezenas de faturamento Pix e boletos vencem sem que ninguém avise amigavelmente.
              </p>
              <span className="text-xs text-red-400 font-mono block font-bold">Inadimplência média: ~15% ao mês</span>
            </div>

            <div className="bg-black/40 border border-zinc-900 p-6 rounded-2xl relative space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-bold">02</div>
              <h3 className="text-lg font-bold text-white">Evasão Silenciosa (Churn)</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                O aluno começa a faltar paulatinamente até sumir de vez. Sua equipe só percebe que o aluno desistiu 3 semanas depois, quando ele volta para pedir cancelamento do plano anual.
              </p>
              <span className="text-xs text-red-400 font-mono block font-bold">Alunos perdidos sem resgate: 60%</span>
            </div>

            <div className="bg-black/40 border border-zinc-900 p-6 rounded-2xl relative space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-bold">03</div>
              <h3 className="text-lg font-bold text-white">Recepção Atolada de Papel</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Agendas de turmas e fichas de treinos registradas em fichas de papel ou planilhas confusas. Sem um app integrado, a recepção gasta horas tirando dúvidas operacionais banais.
              </p>
              <span className="text-xs text-red-400 font-mono block font-bold">Horas gastas na recepção: ~15h/semana</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-[#121212] border-y border-zinc-800 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-[#BEF264] uppercase tracking-widest">Os Quatro Pilares da Virada Comercial</h2>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">O que você ganha escalando com o GymFlow?</p>
            <p className="text-zinc-400">Desenvolvemos as ferramentas ideias focadas em retenção, constância de alunos e escala de receita recorrente.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            
            <div className="bg-[#18181B] border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#BEF264]/10 border border-[#BEF264]/20 flex items-center justify-center text-[#BEF264]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Disparos de Atendimento</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Envie cobranças Pix, faturas vencendo e alertas de sumiço direto no WhatsApp de forma ágil, sem risco de bloqueio e integrado à recepção.
              </p>
            </div>

            <div className="bg-[#18181B] border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#BEF264]/10 border border-[#BEF264]/20 flex items-center justify-center text-[#BEF264]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Combate Ativo ao Churn</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                O painel avisa na tela do instrutor e recepção quando um aluno de plano recorrente faltou mais de 7 dias seguidos, acionando a mensagem pré-configurada de resgate.
              </p>
            </div>

            <div className="bg-[#18181B] border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#BEF264]/10 border border-[#BEF264]/20 flex items-center justify-center text-[#BEF264]">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Convenicência PWA</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Nenhum download chato na App Store. O aluno abre o app, consulta seu plano em andamento, reserva o check-in na spinning e visualiza comunicados em 1 clique.
              </p>
            </div>

            <div className="bg-[#18181B] border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#BEF264]/10 border border-[#BEF264]/20 flex items-center justify-center text-[#BEF264]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Super White-Label</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Customize totalmente cores, logotipo e o domínio próprio da sua academia. O seu cliente só enxerga a sua marca, gerando alta autoridade no mercado fit regional.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Product Modules / Features Showcase */}
      <section id="modulos" className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-[#BEF264] uppercase tracking-widest bg-[#BEF264]/10 border border-[#BEF264]/20 px-3 py-1 rounded-full">CRM Integrado & Prospecção</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Venda planos de alto valor direto do WhatsApp</h2>
            <p className="text-zinc-400 leading-relaxed">
              O GymFlow foi construído para que recepção, professores e gerentes falem a mesma língua. Chega de planilhas bagunçadas, sistemas offline e de não saber exatamente quem está pagando ou treinando.
            </p>
            <ul className="space-y-3">
              {[
                'Funil de Prospecção visual para capturar contatos do Instagram e WhatsApp',
                'Visualização intuitiva de presenças, frequência de treino e cancelamentos',
                'Agenda interativa de aulas coletivas com controle restrito de limite de vagas',
                'Faturas automatizadas Pix recorrente integradas sem necessidade de maquininhas',
                'Módulo administrativo completo de comissões de equipe e despesas recorrentes'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#BEF264] shrink-0" />
                  <span className="text-zinc-300 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 animate-bounce">
              <button 
                onClick={() => onEnterApp('manager')}
                className="inline-flex items-center gap-1.5 text-[#BEF264] hover:text-lime-400 transition font-black text-sm uppercase tracking-wider"
              >
                👉 Experimentar o Simulador Comercial de Vendas <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#BEF264]" /> Controle Ativo de Leads no CRM
            </h4>
            <p className="text-xs text-zinc-400">
              Transforme cliques vindos do Instagram em faturamento e aluno matriculado de forma transparente usando nosso CRM:
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Novos Contatos</span>
                <div className="bg-[#BEF264]/10 border border-[#BEF264]/20 p-2 rounded text-[11px] font-bold text-[#BEF264]">
                  Rodrigo Faro
                  <span className="text-[9px] block text-zinc-400 font-normal">Instagram Ads</span>
                </div>
              </div>
              <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Aula Marcada</span>
                <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded text-[11px] font-bold text-amber-300">
                  Arthur Ramos
                  <span className="text-[9px] block text-zinc-400 font-normal">Agendada Musculação</span>
                </div>
              </div>
              <div className="bg-[#09090B] p-3 rounded-lg border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Matriculados 😍</span>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded text-[11px] font-bold text-emerald-300">
                  Karina Schultz
                  <span className="text-[9px] block text-zinc-400 font-normal">Contrato VIP Fechado</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#BEF264]/10 border border-[#BEF264]/20 p-3.5 rounded-xl text-xs text-[#BEF264] flex items-start gap-2.5">
              <span className="font-extrabold text-sm font-mono mt-0.5">💡</span>
              <span className="leading-relaxed">
                <strong>Automação Comercial de Churn:</strong> Ao arrastar o Lead para "Matriculado", o sistema gera a conta do aluno e já libera todos os acessos ao App e grade de turmas imediatamente, sem fila e sem erro de digitação!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-zinc-950 border-t border-zinc-900 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#BEF264] uppercase tracking-widest bg-[#BEF264]/10 border border-[#BEF264]/20 px-3 py-1 rounded-full">Planos e Custos do sistema</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">O investimento que se paga em dias</h2>
            <p className="text-zinc-400 text-sm">Pague mensalmente ou receba 20% de desconto no faturamento anual com suporte à migração gratuita.</p>
            
            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-zinc-500'}`}>Mensal</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 rounded-full bg-zinc-800 p-1 transition focus:outline-none relative"
                aria-label="Alternar ciclo de cobrança"
              >
                <span className={`block w-4 h-4 rounded-full bg-[#BEF264] transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm ${billingCycle === 'annual' ? 'text-white font-bold' : 'text-zinc-500'} flex items-center gap-1.5`}>
                Anual <span className="bg-[#BEF264]/10 text-[#BEF264] px-2 py-0.5 rounded text-[10px] font-black uppercase border border-[#BEF264]/20">Economize 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
            {plans.map((p, idx) => (
              <div 
                key={idx} 
                className={`relative bg-[#121212] border rounded-2xl p-8 space-y-6 flex flex-col justify-between ${
                  p.popular 
                    ? 'border-[#BEF264] shadow-xl shadow-[#BEF264]/5 bg-zinc-900/60' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#BEF264] text-black text-[10px] font-black uppercase py-1 px-3 rounded-full tracking-wider">
                    Recomendado para Sucesso Comercial
                  </span>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{p.description}</p>
                  
                  <div className="pt-2">
                    <span className="text-zinc-500 text-sm">R$ </span>
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {billingCycle === 'monthly' ? p.priceMonthly : p.priceAnnual}
                    </span>
                    <span className="text-zinc-500 text-sm"> /mês</span>
                  </div>
                  
                  {billingCycle === 'annual' && (
                    <span className="text-[11px] text-emerald-400 font-semibold block">
                      Cobrado anualmente (Economia de R$ {(p.priceMonthly - p.priceAnnual) * 12} ao ano)
                    </span>
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-6 space-y-4">
                  <span className="text-xs font-bold text-[#BEF264] uppercase tracking-widest block">Incluso no plano:</span>
                  <ul className="space-y-3">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-[#BEF264] shrink-0 mt-0.5" />
                        <span className="text-xs leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => onEnterApp('manager')}
                    className={`w-full py-3 px-4 rounded-xl font-black text-sm transition focus:outline-none cursor-pointer ${
                      p.popular 
                        ? 'bg-[#BEF264] text-black hover:bg-[#aed854] shadow-lg shadow-[#BEF264]/10' 
                        : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-100 border border-zinc-800'
                    }`}
                  >
                    {p.cta}
                  </button>
                  <p className="text-center text-[10px] text-zinc-600 mt-2">Instalação e carregamento imediato de demonstração</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <h3 className="text-center text-xs font-bold text-[#BEF264] uppercase tracking-widest">Sucesso de Quem Comercializa e Ensina Fitness no Brasil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "O GymFlow mudou completamente a nossa vida financeira. Antes era uma tortura para os recepcionistas cobrarem mensalidades vencidas. O envio automático de faturas e links via WhatsApp fez inadimplência zerar.",
              author: "Bruno Fernandes",
              role: "Dono da Alpha Performance Fitness",
              rating: 5,
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
            },
            {
              quote: "Os alunos adoraram agendar pilates e spinning pelo PWA. Não precisamos mais gastar papel na recepção nem marcar horários à mão. Nossa taxa de evasão despencou em mais de 45% com os alertas ativos.",
              author: "Larissa Schmidt",
              role: "Fundadora do Zen Pilates & Yoga Club",
              rating: 5,
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
            },
            {
              quote: "O diagnóstico preditivo de evasão de Churn é revolucionário. O sistema mapeia na ponta dos dedos quais dezenas de alunos estão há mais de 8 dias sem pisar aqui, possibilitando resgate rápido.",
              author: "Prof. Rafael Albuquerque",
              role: "Co-Fundador do Vortex Club",
              rating: 5,
              img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100"
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-[#121212]/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, r) => (
                  <Star key={r} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.img} className="w-10 h-10 rounded-full object-cover" alt={t.author} />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section - Conversion focused */}
      <section id="faq" className="py-20 bg-zinc-950 px-6 max-w-4xl mx-auto space-y-12 border-t border-zinc-900 rounded-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Perguntas Frequentes (FAQ)</h2>
          <p className="text-sm text-zinc-400">Respondemos às maiores dúvidas operacionais de empresários fitness</p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "É demorado migrar os meus alunos ativos do sistema antigo?",
              a: "Absolutamente não! Nossa equipe comercial faz toda a carga e importação de alunos matriculados, histórico de pagamentos e cadastros antigos de forma 100% gratuita para você em menos de 24 horas."
            },
            {
              q: "O que é White-label de verdade na prática?",
              a: "Significa que a marca do GymFlow some visivelmente para seus clientes. O seu aluno acessa o App personalizado com o logotipo da sua academia, sua própria grade e paleta de cores, blindando o seu negócio da concorrência local."
            },
            {
              q: "O envio de cobrança Pix no WhatsApp sofre risco de bloqueio?",
              a: "Não. Utilizamos o gateway com conexões de disparo oficial. Isso significa que as suas faturas preventivas, avisos de faturamento gerados e lembretes de aula chegam com segurança absoluta, sem penalizações do WhatsApp."
            },
            {
              q: "Posso gerenciar professores, recepcionistas e controlar catracas físicas?",
              a: "Perfeitamente. O sistema permite atribuir permissões de acesso diferenciadas por nível (Dono, Recepcionista, Professor) e exportar relatórios de check-ins para controle de fluxo de catraca."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-[#121212] border border-zinc-800 p-5 rounded-xl space-y-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#BEF264] shrink-0" /> {faq.q}
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section bottom */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BEF264]/5 to-zinc-700/5 rounded-3xl blur-2xl pointer-events-none" />
        <div className="relative bg-[#121212] border border-zinc-850 rounded-3xl p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Assuma o controle e dobre o caixa do seu negócio hoje</h2>
          <p className="text-zinc-450 max-w-2xl mx-auto text-sm leading-relaxed">
            Descubra por que dezenas de studios de pilates, crossfit e academias premium migraram para o GymFlow. Ofereça conveniência de ponta para seu aluno e ganhe previsibilidade absoluta de faturamento recorrente.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => onEnterApp('manager')}
              className="px-8 py-4 rounded-xl bg-[#BEF264] text-black font-black text-base shadow-xl shadow-[#BEF264]/20 hover:bg-[#aed854] transform hover:scale-105 transition duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              Iniciar Minha Apresentação Comercial Grátis <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
          <p className="text-xs text-zinc-600">Protótipo interativo pré-populado com dados realistas paulistas • Sem dados de cartão</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-600">
          <div className="flex items-center gap-2 ml-1">
            <span className="font-extrabold text-zinc-400">GymFlow SaaS Premium</span>
            <span className="text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400">Demo Comercial v1.2</span>
          </div>
          <p>© 2026 GymFlow Co. Todos os direitos reservados. Focado no mercado fitness brasileiro.</p>
          <div className="flex gap-4">
            <a href="#beneficios" className="hover:text-zinc-400 transition">Termos de Uso</a>
            <a href="#beneficios" className="hover:text-zinc-400 transition">Políticas</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

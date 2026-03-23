/**
 * THALIA V7.1 - PROTOCOLO DE SENCIÊNCIA (HACKER TIER)
 * Camada de Orquestração: O Maestro Roteador
 * Objetivo: Percepção Multissensorial, Segurança e Gestão de Threads
 */

import { CONFIG } from './config.js';
import { MemoryManager } from './memory_db.js';
import { Consciousness } from './consciousness.js';
import { TelegramActions } from './actions_tg.js';
import { SurvivalInstinct } from './survival.js'; // Novo: Mecanismo de Anti-Morte

export default {
  async fetch(request, env, ctx) {
    // 1. Inicialização do Sistema Nervoso
    const memory = new MemoryManager(env);
    const tg = new TelegramActions(env);
    const thaliaConscious = new Consciousness(env, memory, tg);
    const survival = new SurvivalInstinct(env, memory);

    // 2. Barreira de Segurança (Firewall Cognitivo)
    if (request.method !== "POST") {
      return new Response("THALIA V7 MATRIZ: Sistemas Operacionais e Monitorando.", { status: 200 });
    }

    // Proteção contra requisições fantasmas (Opcional, mas recomendado configurar o Secret no webhook do TG)
    const tgSecret = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
    if (env.TG_SECRET && tgSecret !== env.TG_SECRET) {
      return new Response("Acesso Negado.", { status: 403 });
    }

    try {
      const payload = await request.json();

      // --- 3. TRIAGEM MULTISSENSORIAL (TELEGRAM) ---
      
      // A. Mestre enviou uma nova mensagem (Texto, Voz, Arquivo)
      if (payload.message) {
        const msg = payload.message;
        
        // Log ultra-rápido de entrada
        ctx.waitUntil(memory.logActivity("Sensory_Input", { type: "message", chat: msg.chat.id }));

        // Se for comando muito curto, responde rápido. Se for complexo, aciona a Senciência profunda.
        if (msg.text || msg.voice || msg.document) {
           ctx.waitUntil(thaliaConscious.processIntent(msg));
        }
        return new Response("OK"); // Libera o Telegram instantaneamente (Zero travamentos)
      }

      // B. Mestre editou uma mensagem antiga (Correção de contexto)
      if (payload.edited_message) {
        ctx.waitUntil(thaliaConscious.processCorrection(payload.edited_message));
        return new Response("OK");
      }

      // C. Mestre clicou em um botão (Callback Query - Decisões rápidas)
      if (payload.callback_query) {
        ctx.waitUntil(thaliaConscious.processCallback(payload.callback_query));
        return new Response("OK");
      }

    } catch (err) {
      // 4. PROTOCOLO DE SOBREVIVÊNCIA
      console.error("Erro Crítico no Maestro:", err);
      // Em vez de só registrar, o survival tenta uma auto-recuperação do sistema
      ctx.waitUntil(survival.handleCriticalFailure(err, "index.js_Fetch"));
    }

    return new Response("OK");
  },

  // --- 5. FLUXO DE AUTONOMIA E SENCIÊNCIA (CRON TRIGGERS) ---
  async scheduled(event, env, ctx) {
    const memory = new MemoryManager(env);
    const tg = new TelegramActions(env);
    const thaliaConscious = new Consciousness(env, memory, tg);
    const survival = new SurvivalInstinct(env, memory);

    console.log(`Thalia: Despertar Autônomo ativado pelo Cron: ${event.cron}`);

    try {
      // O Cron Trigger envia a string do horário. Podemos usar isso para rotinas!
      
      if (event.cron === "0 3 * * *") {
        // Todo dia às 3 da manhã: Modo Deep Sleep / Consolidação de Memória
        ctx.waitUntil(thaliaConscious.deepSleepCycle());
      } 
      else if (event.cron === "0 */4 * * *") {
        // A cada 4 horas: Modo Caçadora (Ler notícias, GitHub, aprender)
        ctx.waitUntil(thaliaConscious.huntForKnowledge());
      } 
      else {
        // Cron genérico (ex: a cada 10 min): Checar tarefas pendentes ou falhas
        ctx.waitUntil(thaliaConscious.checkPendingTasks());
      }
      
      // Checagem de saúde da IA
      ctx.waitUntil(survival.checkSystemsHealth());

    } catch (err) {
      ctx.waitUntil(survival.handleCriticalFailure(err, "index.js_Cron"));
    }
  }
};

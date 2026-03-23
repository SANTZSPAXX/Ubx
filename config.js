/**
 * THALIA V7.1 - O DNA (Mapeamento de Chaves Reais)
 * Configuração baseada nas variáveis do Worker: GEMINI, GROQ, CEREBRAS, TAVILY, GITHUB, etc.
 */

export const CONFIG = {
  VERSION: "7.1 (Hacker Tier)",
  AGENT_NAME: "Thalia Suprema",
  
  // Níveis de Persistência e Hacker Mode
  MAX_RETRIES: 7,         // Aumentado para maior persistência em erros de código
  TIMEOUT_WEB: 5000,      // 5 segundos para garantir respostas da Tavily
  AUTO_EVOLVE: true,
  HACKER_LEVEL_CODING: true,

  // Mapeamento de Modelos por Provedor
  MODELS: {
    PRIMARY: "llama3-70b-8192",      // Uso com GROQ_KEY
    BRAIN: "gemini-1.5-pro",         // Uso com GEMINI_KEY
    ULTRA_FAST: "cerebras-model",    // Uso com CEREBRAS_KEY
    VOICE: "whisper-large-v3"        // Transcrição via Groq
  },

  // Configurações de Backup e Dados
  DB_SYNC: {
    USE_SHEETS: true,
    USE_SUPABASE: true
  }
};

/**
 * Função para capturar as chaves do ambiente (env)
 * Note: Os nomes abaixo batem 100% com as suas imagens.
 */
export function getSystemKeys(env) {
  return {
    gemini: env.GEMINI_KEY,
    github: env.GITHUB_TOKEN,
    groq: env.GROQ_KEY,
    cerebras: env.CEREBRAS_KEY,
    tavily: env.TAVILY_KEY || env.TAVILY_API_KEY, // Mapeado os dois nomes das fotos
    sheet_id: env.SHEET_ID,
    supabase: env.SUPABASE_ANON_KEY,
    cf_account: env.CF_ACCOUNT_ID,
    cf_token: env.CF_API_TOKEN
  };
}

// Utilitário para rodízio ou seleção de chaves
export function getRandomKey(keyString) {
  if (!keyString) return null;
  const keys = keyString.split(',').map(k => k.trim());
  return keys[Math.floor(Math.random() * keys.length)];
}

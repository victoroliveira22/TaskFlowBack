const fs = require("fs"); // file system — ler/escrever arquivos
const path = require("path"); // caminhos de arquivos
const os = require("os"); // informacoes do sistema operacional

// ── fs — ler conteudo de um arquivo ──────────────────────

const conteudo = fs.readFileSync("ola.js", "utf8");

console.log(conteudo);

// ── fs — listar arquivos da pasta atual ───────────────────

const arquivos = fs.readdirSync(".");

console.log("Arquivos:", arquivos);

// ── path — montar caminhos de forma segura ────────────────

// path.join funciona no Windows, Mac e Linux

const caminho = path.join(__dirname, "src", "server.js");

console.log("Caminho:", caminho);

// ── os — informacoes do sistema ───────────────────────────

console.log("SO:", os.platform());
console.log("CPU cores:", os.cpus().length);
console.log(
    "RAM total:",
    Math.round(os.totalmem() / 1024 / 1024 / 1024) + " GB",
);

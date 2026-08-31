const fs = require("fs");
const path = require("path"); 
const os = require("os");

const conteudo = fs.readFileSync("ola.js", "utf8");

console.log(conteudo);

const arquivos = fs.readdirSync(".");
console.log("Arquivos:", arquivos);

const caminho = path.join(__dirname, "src", "server.js");
console.log("Caminho:", caminho);

console.log("SO:", os.platform());
console.log("CPU cores:", os.cpus().length);
console.log(
    "RAM total:",
    Math.round(os.totalmem() / 1024 / 1024 / 1024) + " GB",
);

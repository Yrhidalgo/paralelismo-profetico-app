const fs = require("fs");
const VirtualMachine = require("scratch-vm");

const vm = new VirtualMachine();

const projectPath = "node_modules/scratch-parser/test/fixtures/data/_comments.sb3";
const project = fs.readFileSync(projectPath);

console.log("Scratch VM creada:", !!vm);
console.log("Proyecto encontrado:", project.length > 0);
console.log("Tamaño del proyecto:", project.length, "bytes");

vm.loadProject(project).then(() => {
    console.log("Proyecto cargado correctamente.");

    const targets = vm.runtime.targets || [];
    console.log("Targets encontrados:", targets.length);

    console.log("Scratch VM funcionando correctamente.");
}).catch((error) => {
    console.error("ERROR cargando proyecto:");
    console.error(error);
    process.exit(1);
});

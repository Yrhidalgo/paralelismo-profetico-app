const VirtualMachine = require("scratch-vm");

const vm = new VirtualMachine();

console.log("Scratch VM creada:", !!vm);
console.log("Tipo:", vm.constructor.name);
console.log("Cargando proyecto...");

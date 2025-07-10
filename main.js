// Variables y constantes globales
const CATEGORIAS = [
  "Alimentación",
  "Transporte",
  "Entretenimiento",
  "Servicios",
  "Salud",
  "Educación",
  "Otros",
];

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Arrays para almacenar datos
let gastos = [];
let totalesPorCategoria = {
  Alimentación: 0,
  Transporte: 0,
  Entretenimiento: 0,
  Servicios: 0,
  Salud: 0,
  Educación: 0,
  Otros: 0,
};
let mesActual = 0;

// Variables de control
let simuladorActivo = false;
let contadorGastos = 0;

function iniciarSimulador() {
  const nombreUsuario = prompt(`
¡Bienvenido al Simulador de Gastos Mensuales!

Por favor, ingresa tu nombre:`);

  if (nombreUsuario === null || nombreUsuario.trim() === "") {
    alert("No es un nombre valido");
    return;
  }

  // Procesamiento de datos
  simuladorActivo = true;

  let mesesTexto = `Selecciona el mes para registrar los gastos:

`;
  for (let i = 0; i < MESES.length; i++) {
    mesesTexto += `${i + 1}. ${MESES[i]}
`;
  }

  const mesSeleccionado = parseInt(
    prompt(
      mesesTexto +
        `
Ingresa el número del mes:`
    )
  );

  if (
    isNaN(mesSeleccionado) ||
    mesSeleccionado < 1 ||
    mesSeleccionado > MESES.length
  ) {
    alert("Mes inválido");
  } else {
    mesActual = mesSeleccionado - 1;
  }

  // Salida de resultados
  const mensajeBienvenida = `
¡Hola ${nombreUsuario}! 

Mes seleccionado: ${MESES[mesActual]}
Simulador de Gastos Mensuales iniciado correctamente


¡Escribe agregarGasto() en la consola para comenzar!`;

  alert(mensajeBienvenida);
  console.log("Simulador iniciado para:", nombreUsuario);
  console.log("Mes seleccionado:", MESES[mesActual]);
  console.log("Funciones disponibles: agregarGasto(), calcularTotal()");
}

function agregarGasto() {
  //Entrada de datos
  const descripcion = prompt(`
Ingresa la descripción del gasto:

Ejemplo: Almuerzo en restaurante`);

  if (descripcion === null || descripcion.trim() === "") {
    alert("No se ingresó una descripción válida.");
    return;
  }

  const monto = parseFloat(
    prompt(`
Ingresa el monto del gasto (solo números):

Ejemplo: 25.50`)
  );

  if (isNaN(monto) || monto <= 0) {
    alert("Monto inválido. Debe ser un número mayor a 0.");
    return;
  }

  // Mostrar categorías disponibles
  let categoriasTexto = `Selecciona una categoría:

`;
  for (let i = 0; i < CATEGORIAS.length; i++) {
    categoriasTexto += `${i + 1}. ${CATEGORIAS[i]}
`;
  }

  const categoriaIndex = parseInt(
    prompt(
      categoriasTexto +
        `
Ingresa el número de la categoría:`
    )
  );

  if (
    isNaN(categoriaIndex) ||
    categoriaIndex < 1 ||
    categoriaIndex > CATEGORIAS.length
  ) {
    alert("Categoría inválida.");
    return;
  }

  const categoria = CATEGORIAS[categoriaIndex - 1];

  const nuevoGasto = {
    id: ++contadorGastos,
    descripcion: descripcion,
    monto: monto,
    categoria: categoria,
    fecha: new Date().toLocaleDateString(),
    mes: mesActual,
  };

  gastos.push(nuevoGasto);

  // Actualizar totales por categoría
  if (totalesPorCategoria[categoria]) {
    totalesPorCategoria[categoria] += monto;
  } else {
    totalesPorCategoria[categoria] = monto;
  }

  // Salida de resultados
  const mensajeExito = `
Gasto agregado exitosamente!

ID: ${nuevoGasto.id}
Descripción: ${nuevoGasto.descripcion}
Monto: $${nuevoGasto.monto.toFixed(2)}
Categoría: ${nuevoGasto.categoria}
Fecha: ${nuevoGasto.fecha}

Total de gastos: ${gastos.length}
Total acumulado: $${calcularTotalGastos().toFixed(2)}`;

  alert(mensajeExito);
  console.log("Gasto agregado:", nuevoGasto);
  console.log("Total gastos:", gastos.length);
  console.log("Total acumulado: $", calcularTotalGastos().toFixed(2));
}

function calcularTotal() {
  // Validar que haya gastos
  if (gastos.length === 0) {
    alert("No hay gastos registrados. Ejecuta agregarGasto() para comenzar.");
    return;
  }

  // Procesamiento de datos
  const totalGastos = calcularTotalGastos();

  // Salida de resultados
  let mensajeTotal = `
TOTAL DE GASTOS

Mes: ${MESES[mesActual]}
Cantidad de gastos: ${gastos.length}
Total acumulado: $${totalGastos.toFixed(2)}

GASTOS POR CATEGORÍA:`;

  // Bucle para mostrar gastos por categoría
  for (let i = 0; i < CATEGORIAS.length; i++) {
    const porcentaje = (
      (totalesPorCategoria[CATEGORIAS[i]] / totalGastos) *
      100
    ).toFixed(1);
    mensajeTotal += `
${CATEGORIAS[i]}: $${totalesPorCategoria[CATEGORIAS[i]].toFixed(
      2
    )} (${porcentaje}%)`;
  }

  alert(mensajeTotal);
  console.log(" Total gastos: $", totalGastos.toFixed(2));
  console.log("Cantidad gastos:", gastos.length);
}

// Función para calcular total de gastos
function calcularTotalGastos() {
  let total = 0;
  for (let i = 0; i < gastos.length; i++) {
    total += gastos[i].monto;
  }
  return total;
}

console.log("SIMULADOR DE GASTOS MENSUALES");
iniciarSimulador();



export const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

export function formataData(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const ano = data.getFullYear();
   
    
    return `${dia}-${mes}-${ano}`;
}

export function formataDataUTC(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const ano = data.getUTCFullYear();
   
    
    return `${dia}-${mes}-${ano}`;
}

export function formataDataHora(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${dia}-${mes}-${ano} ${horas}:${minutos}`;
}

export function formataDataHoraUTC(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const ano = data.getUTCFullYear();
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');
    
    return `${dia}-${mes}-${ano} ${horas}:${minutos}`;
}

export function formataHora(dataISO) {

    const data = new Date(dataISO);
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${horas}:${minutos}`;
}

export function formataHoraUTC(dataISO) {

    const data = new Date(dataISO);
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');
    
    return `${horas}:${minutos}`;
}

export function formataDataAPI(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
}

export function formataDataAPIUTC(dataISO) {

    const data = new Date(dataISO);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const ano = data.getUTCFullYear();
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
}

export function formatarMoeda(valor, moeda = 'BRL', locale = 'pt-BR') {

    return valor.toLocaleString(locale, { style: 'currency', currency: moeda });
    
}

export function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - firstDayOfYear) / (24 * 60 * 60 * 1000);
    return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
  }

 export function gerarCorHexAleatoria() {
    const caracteres = '0123456789ABCDEF';
    let cor = '#';
    
    for (let i = 0; i < 6; i++) {
      cor += caracteres[Math.floor(Math.random() * 16)];
    }
  
    return cor;
  }

  export function calcularPercentual(total, valor) {
  
      if (total === 0) {
        return "0%"; // Evita divisão por zero
      }
      
      const percentual = Math.round((valor / total) * 100);
      return `${percentual}%`;
  
    }


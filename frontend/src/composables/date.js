import moment from 'moment';
export function validateDate(dateString) {
  // regex para validar data no formato yyyy-mm-dd
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;

  // extrair as partes da data usando o regex
  const parts = regex.exec(dateString);

  if (!parts) {
    // se a data não estiver no formato esperado, retorna falso
    return 'Digite uma data válida no formato dd/mm/yyyy';
  }

  // converter as partes da data em números
  const year = parseInt(parts[1], 10);
  const month = parseInt(parts[2], 10);
  const day = parseInt(parts[3], 10);

  if (year < 1900) {
    return `Digite uma data entre o ano 1900 e hoje`;
  }

  // criar um objeto Date a partir da data
  const date = new Date(year, month - 1, day);

  // verificar se a data é inválida
  if (date.toString() === 'Invalid Date') {
    return 'Digite uma data válida no formato dd/mm/yyyy';
  }

  if (date.getFullYear() < 1900 || date > new Date()) {
    return `Digite uma data entre o ano 1900 e hoje`;
  }

  // se a data passou em todas as validações, retorna verdadeiro
  return '';
}

export function formatDate(dateString) {
  const defaultFormat = 'YYYY-MM-DD';
  const BRFormat = 'DD/MM/YYYY';

  return moment(dateString, defaultFormat).format(BRFormat);
}

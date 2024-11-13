export interface FiltroForm {
  filtro: string; // Tipo de filtro (ex: 'title', 'authors')
  searchTerm: string; // Termo de busca
  operador?: string; // Operador ('AND' ou 'OR') - opcional para o último filtro
}
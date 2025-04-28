export interface FormFilter {
  filter: string; // Tipo de filtro (ex: 'title', 'authors')
  searchTerm: string; // Termo de busca
  operator?: string; // Operador ('AND' ou 'OR') - opcional para o último filtro
}
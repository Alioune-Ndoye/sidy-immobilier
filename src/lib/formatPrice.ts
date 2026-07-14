// Format FCFA avec espaces comme séparateurs de milliers (identique serveur/client)
export function formatPrice(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

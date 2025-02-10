import { FavoritesService } from "./services/favorites.service";
import { ProductsService } from "./services/products.service";

export function favoritesFactory(isFavorite: boolean) {
  return () => {
    if (isFavorite) {
      return new FavoritesService();
    }
    return new ProductsService();
  };
}
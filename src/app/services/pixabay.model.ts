export interface PixabayImage {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  previewURL: string;
}

export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
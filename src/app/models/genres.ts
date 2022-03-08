export interface GenresDTO {
  data: { genres: Genre[] };
}

export interface Genre {
  id: string;
  name: string;
}

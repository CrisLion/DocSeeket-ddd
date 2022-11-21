export class Rating {
  private rating: number;

  private constructor(rating: number) {
    this.rating=rating;
  }

  public getRating(): number {
    return this.rating;
  }

  public static create(rating: number) {
    return new Rating(rating);
  }
}
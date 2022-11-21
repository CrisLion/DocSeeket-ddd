import { Column } from "typeorm";

export class RatingValue {
  @Column('float', {name: 'rating', nullable: true})
  public rating: number;

  private constructor(rating: number) {
    this.rating=rating;
  }

  public static from(rating: number) {
    return new RatingValue(rating);
  }
}
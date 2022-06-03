export interface getCoursesApiResponse{
    id: number;
    description: string;
    title: string;
    reviews: Array<[
      id: number,
      comment: string]
    >;
  }
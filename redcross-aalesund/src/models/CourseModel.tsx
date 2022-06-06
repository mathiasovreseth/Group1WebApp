export interface getCoursesApiResponse{
    id: number;
    description: string;
    title: string;
    reviews: Array<{
      id: number,
      comment: string
      name?: string}
    >;
  }


  export interface getCommentsApiResponse{
    id: number,
    name: string,
    comment: string
  }

  
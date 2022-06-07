export interface getCoursesApiResponse{
    id: number;
    description: string;
    title: string;
    reviews: Array<{
      id: number,
      comment: string,
      email: string,
      name?: string,
      enabled: boolean | null,
    }
    >;
  }


  export interface getCommentsApiResponse{
    id: number,
    name: string,
    comment: string
  }

  
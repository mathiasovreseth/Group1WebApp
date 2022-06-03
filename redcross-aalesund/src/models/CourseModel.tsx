export interface getCoursesApiResponse{
    id: number;
    description: string;
    title: string;
    reviews: Array<[
      id: number,
      comment: string]
    >;
  }


  export interface getCommentsApiResponse{
    map(arg0: (value: any) => void): import("react").ReactNode;
    id: number,
    name: string,
    comment: string
  }

  
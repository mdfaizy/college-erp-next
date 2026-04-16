// export interface Teacher {
//   id: number;
//   subject: string;
//   qualification: string;
//   experience: string;
//   phone: string;

//   user: {
//     id: number;
//     name: string;
//     email: string;
//   };
// }


export interface CreateTeacherPayload {
  userId: number;
  subject: string;
  qualification: string;
  experience: string;
  phone: string;
}

export interface Teacher {
  id: number;
  subject: string;
  qualification: string;
  experience: string;
  phone: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
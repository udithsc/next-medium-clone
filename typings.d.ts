export interface Author {
  name?: string;
  image?: any;
}

export interface Post {
  _id: string;
  _createdAt: string;
  title?: string;
  mainImage?: any;
  author?: Author;
  slug?: string;
  content?: any;
  description: string;
  body: Object[];
  comments: Comment[];
}

export interface Comment {
  _id: string;
  _createdAt: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  name: string;
  email: string;
  comment: string;
  approved: string;
  post: {
    _ref: string;
    _type: string;
  };
}

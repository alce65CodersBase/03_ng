export type ImageInfo = {
  urlOriginal: string;
  url: string;
  urlOut: string;
  mimetype: string;
  size: number;
};

export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  role: string;
  image: ImageInfo;
};

export type RegisterUserData = {
  // id: string;
  email: string;
  passwd: string;
  firstName: string;
  surname: string;
  // role: string;
  image: ImageInfo;
};

export type LoginUserData = {
  email: string;
  passwd: string;
};

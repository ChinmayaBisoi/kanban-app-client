export interface RequestOptions {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body: string;
  redirect: string;
  credentials: string;
  mode: string;
}

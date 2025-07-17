export interface WordPressPostResponse {
  id: number;
  date: string;
  slug: string;
  link: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
}

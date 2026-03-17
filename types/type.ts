export type Deck = {
  id: string;
  title: string;
  description: string;
  level: string;
  cover_image: string | null;
  is_published: boolean;
  created_at: string;
};
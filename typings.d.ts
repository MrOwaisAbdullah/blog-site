interface PostCard {
  title: string;
  summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  categories: { title: string }[];
  mainImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  publishedAt: string;
  author: {
    name: string;
  };
  slug: {
    current: string | null;
  }
};

interface BlogSectionProps {
  limit?: number; 
}

interface BlogComment {
  _id: string;
  name: string;
  email: string;
  comment: string;
  _createdAt: string;
}
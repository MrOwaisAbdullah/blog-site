interface PostCard {
  title: string;
  summary: string;
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
  slug: string;
}

interface BlogSectionProps {
  limit?: number; 
}
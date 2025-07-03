export interface NavItem {
  name: string;
  id: string;
}

export interface EducationEntry {
  institution: string;
  degreeOrFocus: string;
  years: string;
  description: string;
  link?: string;
  linkText?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  years: string;
  description: string;
  link?: string;
  linkText?: string;
}

// Represents a Prismic document for a blog post.
// Using 'any' for Prismic fields to avoid complex type definitions without full library/TS support in this environment.
export interface BlogPost {
  id: string;
  uid: string | null;
  data: {
    title: any; // Prismic TitleField
    subtitle: any; // Prismic RichTextField
    featured_image: { // Prismic ImageField
      url: string | null;
      alt: string | null;
      [key: string]: any;
    };
    main_content: any; // Prismic RichTextField
    publish_date: string | null; // Prismic DateField (YYYY-MM-DD)
  };
}


export interface SocialLink {
  name: string;
  acronym: string;
  url: string;
}

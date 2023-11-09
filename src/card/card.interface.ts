export interface Card {
    tags: string[];
    title: string;
    description: string;
    actions: {
      button_text: string;
      type: string;
      website: {
        title: string;
        payload: string;
        url: string;
      };
    }[];
    header?: {
      type: string;
      image: {
        url: string;
        body: string;
      };
    };
  }

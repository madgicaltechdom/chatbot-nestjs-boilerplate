export const newsCarouselNextButtons = () => {
    return [
      {
        type: 'solid',
        body: 'અન્ય સમાચારો જુઓ',
        reply: 'અન્ય સમાચારો જુઓ',
      },
      {
        type: 'solid',
        body: 'અન્ય શ્રેણીઓ જુઓ',
        reply: 'અન્ય શ્રેણીઓ જુઓ',
      },
     
    ];
  };
  
  export const endDropDownButtons = (category: string) => {
    return [
      {
        type: 'solid',
        body: `${category} થી અન્ય શ્રેણીઓ જુઓ`,
        reply: 'અન્ય શ્રેણીઓ જુઓ',
      },
    ];
  };
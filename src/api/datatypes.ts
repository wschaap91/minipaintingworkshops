export type EventsList = {
    data: {
      id: string;
      name: string;
      description: string;
      banner: string | null;
      header_video: string | null;
      is_continuous: boolean;
      dates: {
        id: string;
        flat_date: string;
        starts_at: string;
        ends_at: string;
        doors_open_at: string | null;
      }[];
      venue: {
        name: string;
        street: string;
        house_number: string;
        addition: string | null;
        zipcode: string;
        city: string;
        state: string | null;
        country: string;
        coordinates: {
          latitude: string;
          longitude: string;
        };
      };
      shops: string[];
      tickets: {
        id: string;
        name: string;
        price: string;
        service_fee: number;
        min_order_amount: number | null;
        max_order_amount: number | null;
        sold_out: boolean;
        tags: string[];
      }[];
    }[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };

  export type ShopsList  = {
      data: {
          id: string;
          url: string;
          full_url: string;
          banner: string | null;
          language: string;
          html: string | null;
          css: string | null;
          custom_color: string | null;
          text: string | null;
          protected: boolean;
          invoicing: boolean;
          availability: any[]; // Replace 'any' with a specific type if known
          socials: any[];      // Replace 'any' with a specific type if known
          is_available: boolean;
      }[];
      links: {
          first: string;
          last: string;
          prev: string | null;
          next: string | null;
      };
      meta: {
          current_page: number;
          from: number;
          last_page: number;
          path: string;
          per_page: number;
          to: number;
          total: number;
      };
  };
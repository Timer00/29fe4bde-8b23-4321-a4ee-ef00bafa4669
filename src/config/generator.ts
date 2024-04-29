import { type KeywordsGen } from "@/utils/generator";

// C O N F I G U R A T I O N
export type Keywords = KeywordsGen<{
  service: {
    name: string;
  },
  location: {
    name: string;
  }
}, {
  name: string;
}>;

export const keywords: Keywords = {
  service: {
    'cleaning': {
      name: 'Cleaning'
    },
    'plumbing': {
      name: 'Plumbing'
    }
  },
  location: {
    'berlin': {
      name: 'Berlin'
    },
    'paris': {
      name: 'Paris'
    }
  },
}

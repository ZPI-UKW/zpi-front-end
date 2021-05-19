export interface Annoucements {
  _id: string;
  title: string;
  description: string;
  addedBy: string;
  location: string;
  categoryId: string;
  phone: string;
  email: string;
  costs: {
    day: number;
    week: number;
    month: number;
  };
  createdDate: string;
  editedDate: string;
  images: string[];
}

export const annoucements: Annoucements[] = [
  {
    _id: '1',
    title: 'Wypożyczę Jelcza',
    description: 'Świetny jelcz! Niebieska sczała, śmiga jak szalony. Ładowny i szypki',
    addedBy: '2',
    location: 'Świecie',
    categoryId: '1',
    phone: '321432675',
    email: 'tomek@gmail.com',
    costs: {
      day: 599,
      week: 3499,
      month: 14699,
    },
    createdDate: 'Wed May 10 2021 16:29:07 GMT+0200',
    editedDate: 'Wed May 11 2021 12:04:19 GMT+0200',
    images: [
      'https://trailer.pl/wp-content/uploads/2018/03/Jelcz-315-e1522314770304.jpg',
      'https://trailer.pl/wp-content/uploads/2018/03/Jelcz-315_2-1024x768.jpg',
    ],
  },
  {
    _id: '2',
    title: 'Wypożyczę materac z sklepu Ikea',
    description:
      'Ten średnio twardy materac ma strefy komfortu, które zmniejszają nacisk na biodra i barki, zapewniając wsparcie tam, gdzie tego potrzebujesz. Indywidualne sprężyny kieszeniowe pomogą Ci dobrze się wyspać i obudzić się wypoczętym.',
    addedBy: '1',
    location: 'Toruń',
    categoryId: '2',
    phone: '756093432',
    email: 'maria@o2.pl',
    costs: {
      day: 199,
      week: 699,
      month: 3299,
    },
    createdDate: 'Wed May 12 2021 16:29:07 GMT+0200',
    editedDate: 'Wed May 12 2021 16:29:07 GMT+0200',
    images: [
      'https://www.strefasypialni.pl/userdata/public/gfx/d05827880a9c15f02639831948395bf7.jpg',
    ],
  },
];

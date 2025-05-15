import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  DocumentIcon,
  ClipboardDocumentCheckIcon,
  ShoppingCartIcon,
  ChatBubbleLeftEllipsisIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { Beranda, Profil, Tabel, Portofolio, Layanan, Paket, Pesanan, Testimoni, Faq } from "@/pages/dashboard";
import { Daftar, Masuk } from "@/pages/auth";


const icon = {
  className: "w-5 h-5 text-inherit",
};



export const routes = [
  {
    
    layout: "admin",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "beranda",
      //   path: "/beranda",
      //   element: <Beranda />,
      // },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Dashboard",
        path: "/Dash-Admin",
        element: <Profil />,
      },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "KTI",
        path: "/KTI-Admin",
        element: <Portofolio />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "CBT",
        path: "/CBT-Admin",
        element: <Layanan />,
      },
      
      {
        icon: <DocumentIcon {...icon} />,
        name: "Kelola Soal",
        path: "/kelola-soal",
        element: <Paket />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "Admin",
        path: "/AdminUser",
        element: <Pesanan />,
      },
     
    ],
  },
  {
    title: "Autentikasi",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "masuk",
        path: "/masuk",
        element: <Masuk />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "daftar",
        path: "/daftar",
        element: <Daftar />,
      },
    ],
  },
];



export default routes;



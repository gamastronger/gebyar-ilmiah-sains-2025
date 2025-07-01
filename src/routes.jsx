import {
  // HomeIcon,
  UserCircleIcon,
  // TableCellsIcon,
  ServerStackIcon,
  // RectangleStackIcon,
  Squares2X2Icon,
  DocumentIcon,
  ClipboardDocumentCheckIcon,
  // ShoppingCartIcon,
  // ChatBubbleLeftEllipsisIcon,
  // QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { Profil, Portofolio, Layanan, Paket } from "@/pages/dashboard";
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
        name: "SWC",
        path: "/SWC-Admin",
        element: <Portofolio />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "SC",
        path: "/SC-Admin",
        element: <Layanan />,
      },
      
      {
        icon: <DocumentIcon {...icon} />,
        name: "Kelola Soal",
        path: "/kelola-soal",
        element: <Paket />,
      },
      // {
      //   icon: <ShoppingCartIcon {...icon} />,
      //   name: "Admin",
      //   path: "/AdminUser",
      //   element: <Pesanan />,
      // },
     
    ],
  },
  // {
  //   title: "Autentikasi",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "masuk",
  //       path: "/masuk",
  //       element: <Masuk />,
  //     },
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "daftar",
  //       path: "/daftar",
  //       element: <Daftar />,
  //     },
  //   ],
  // },
];



export default routes;



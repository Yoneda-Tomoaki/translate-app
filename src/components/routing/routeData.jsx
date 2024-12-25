import { Layout } from './../layouts/Layout';
import { Home } from './../pages/Home';
import { About } from './../pages/About';
import { NotFound } from './../pages/NotFound';
import { History } from './../pages/History'; // 翻訳履歴一覧画面
import { Star } from './../pages/Star';       // スター一覧画面

export const routeData = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />, // ホーム画面
      },
      {
        path: 'about',
        element: <About />, // アバウト画面
      },
      {
        path: 'history',
        element: <History />, // 翻訳履歴一覧画面
      },
      {
        path: 'star',
        element: <Star />, // スター一覧画面
      },
      {
        path: '*',
        element: <NotFound />, // 404エラーページ
      },
    ],
  },
];

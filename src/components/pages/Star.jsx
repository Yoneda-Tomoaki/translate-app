import { useContext } from 'react';
import { StateContext } from './../providers/StateContext';
import { StarList } from './../blocks/StarList';

export const Star = () => {
  // Context から textlist を取得
  const { textlist } = useContext(StateContext);

  // isStar が true の要素のみを取得
  const starredItems = textlist.filter((item) => item.isStar);

  return (
    // StarList コンポーネントを呼び出し
    <StarList data={starredItems} />
  );
};

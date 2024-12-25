import { useContext } from 'react';
import { StateContext } from './../providers/StateContext';
import { TextList } from './../blocks/TextList';

export const History = () => {
  // useContextを利用して、StateContextからtextlistを取り出す
  const { textlist } = useContext(StateContext);

  return (
    <div>
      {/* コンポーネントTextListを呼び出し、data属性としてtextlistを渡す */}
      <TextList data={textlist} />
    </div>
  );
};

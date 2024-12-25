import { useContext } from 'react';
import { StateContext } from './../providers/StateContext';
import { TranslateForm } from './../blocks/TranslateForm';

export const Home = () => {
  const { textlist } = useContext(StateContext); // 翻訳履歴を取得

  return (
    <div>
      <TranslateForm />
    </div>
  );
};

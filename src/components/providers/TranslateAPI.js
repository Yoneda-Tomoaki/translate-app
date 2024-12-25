import axios from 'axios';

// 環境変数から取得
const APIURL = import.meta.env.VITE_APIURL;
const APIKEY = import.meta.env.VITE_APIKEY;

/*
 * My Memory API URL
 * https://api.mymemory.translated.net/get?q=翻訳前テキスト&langpair=翻訳前言語名|翻訳後言語名
 * https://api.mymemory.translated.net/get?q=Hello World&langpair=en|it
 *
 */

export const getTranslate = async (text, fromLang, toLang) => {

  const url = 'https://api.mymemory.translated.net/get';

  try {
    const response = await axios.get(url, {
      params: {
        q: text,
        langpair: `${fromLang}|${toLang}`,
      },
    });
    return response.data; // 正しいデータ構造で返す
  } catch (error) {
    console.error('Translation API error:', error);
    throw new Error('Translation API failed.');
  }
};

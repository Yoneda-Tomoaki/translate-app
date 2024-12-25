import { useState, useContext } from 'react';
import { Box, Stack, Button, Container, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DispatchContext } from '../providers/DispatchContext';
import { getTranslate } from '../providers/TranslateAPI';
import { countries } from './Countries';

export const TranslateForm = () => {
  const dispatch = useContext(DispatchContext);
  const [fromText, setFromText] = useState('りんご');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('ja-JP');
  const [toLang, setToLang] = useState('en-US');

  const handleFromTextChange = (e) => {
    setFromText(e.target.value);
  };

  const handleFromLangChange = (e) => {
    setFromLang(e.target.value);
  };

  const handleToLangChange = (e) => {
    setToLang(e.target.value);
  };

  const handleOnClickTranslate = async () => {
    if (fromText === '') {
      setToText('');
      return;
    }

    try {
      const data = await getTranslate(fromText, fromLang, toLang);
      console.log('API Response:', data); // ここでレスポンスを確認
      // レスポンスデータの安全な取得
      let result = data?.responseData?.translatedText || '';
      data?.matches?.forEach((match) => {
        if (match.id === 0) {
          result = match.translation;
        }
      });

      setToText(result);

      dispatch({
        type: 'save',
        payload: {
          data: {
            fromText,
            toText: result,
            fromLang,
            toLang,
          },
        },
      });
    } catch (error) {
      console.error('Translation failed:', error);
      setToText('翻訳に失敗しました。');
    }
  };


  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start" // 上揃えで配置
        spacing={4}
      >
        {/* 翻訳前のテキストと言語 */}
        <Box sx={{ width: '45%' }}>
          <TextField
            variant="outlined"
            rows={10} // 行数を増やして高さを調整
            multiline
            id="from-text"
            label="翻訳前の言葉"
            value={fromText}
            onChange={handleFromTextChange}
            sx={{
              width: '100%', // 幅を100%に設定
              backgroundColor: '#ffffff',
            }}
          />
          <FormControl sx={{ my: 2 }} fullWidth size="small">
            <InputLabel id="from-lang-input-label">翻訳前の言語</InputLabel>
            <Select
              labelId="from-lang-input-label"
              value={fromLang}
              onChange={handleFromLangChange}
              sx={{ backgroundColor: '#ffffff' }}
            >
              {Object.keys(countries).map((key) => (
                <MenuItem key={key} value={key}>
                  {countries[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* 翻訳ボタン */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOnClickTranslate}
          sx={{ height: 50, alignSelf: 'center' }} // ボタンを縦方向中央に揃える
        >
          翻訳
          <ArrowForwardIosIcon fontSize="small" />
        </Button>

        {/* 翻訳後のテキストと言語 */}
        <Box sx={{ width: '45%' }}>
          <TextField
            id="to-text"
            label="翻訳後の言葉"
            multiline
            rows={10} // 行数を増やして高さを調整
            variant="outlined"
            value={toText}
            sx={{
              width: '100%', // 幅を100%に設定
              backgroundColor: '#ffffff',
            }}
          />
          <FormControl sx={{ my: 2 }} fullWidth size="small">
            <InputLabel id="to-lang-input-label">翻訳後の言語</InputLabel>
            <Select
              labelId="to-lang-input-label"
              value={toLang}
              onChange={handleToLangChange}
              sx={{ backgroundColor: '#ffffff' }}
            >
              {Object.keys(countries).map((key) => (
                <MenuItem key={key} value={key}>
                  {countries[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
};

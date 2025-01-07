import { useState, useContext } from 'react';
import { Box, Stack, Button, Container, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { DispatchContext } from '../providers/DispatchContext';
import { getTranslate } from '../providers/TranslateAPI';
import { countries } from './Countries';

export const TranslateForm = () => {
  const dispatch = useContext(DispatchContext);
  const [fromText, setFromText] = useState('りんご');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('ja-JP');
  const [toLang, setToLang] = useState('ko-KR');

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

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => { },
      (err) => {
        console.error('コピーに失敗しました:', err);
      }
    );
  };

  const handleSpeak = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={4}
      >
        {/* 翻訳前のテキストと言語 */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              variant="outlined"
              rows={10}
              multiline
              id="from-text"
              label="翻訳前の言葉"
              value={fromText}
              onChange={handleFromTextChange}
              fullWidth
              sx={{
                fontSize: '25px',
                width: '100%',
                backgroundColor: '#ffffff',
              }}
            />
            {/* 音声読み上げボタン */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSpeak(fromText, fromLang)}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 170, // 翻訳ボタンとの間隔
                zIndex: 1,
                padding: '4px 10px',
              }}
            >
              <VolumeUpIcon sx={{ mr: 1 }} />
              読み上げ
            </Button>
            {/* 翻訳ボタン */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOnClickTranslate}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 70,
                zIndex: 1,
                padding: '10px 20px',
              }}
            >
              翻訳
            </Button>
            {/* コピーアイコン */}
            <IconButton
              color="primary"
              onClick={() => handleCopyToClipboard(fromText)}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 1,
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
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

        {/* 翻訳後のテキストと言語 */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              id="to-text"
              label="翻訳後の言葉"
              multiline
              rows={10}
              variant="outlined"
              value={toText}
              sx={{
                width: '100%',
                backgroundColor: '#ffffff',
              }}
            />
            {/* 音声読み上げボタン */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSpeak(toText, toLang)}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 60,
                zIndex: 1,
                padding: '4px 10px',
              }}
            >
              <VolumeUpIcon sx={{ mr: 1 }} />
              読み上げ
            </Button>
            {/* コピーアイコン */}
            <IconButton
              color="primary"
              onClick={() => handleCopyToClipboard(toText)}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 1,
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
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

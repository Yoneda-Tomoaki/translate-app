import { Box, Stack, Paper, Button } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const About = () => (
  <Container>
    <Stack direction="column" alignItems="center" p={2} gap={3}>
      <Typography variant="h4" component="h2">
        アプリケーションの紹介
      </Typography>
      <Typography variant="subtitle1" component="h3">
        翻訳機能を提供します
      </Typography>
      <Box>
        <li>単語、文章を翻訳します</li>
        <li>翻訳した言葉の履歴を一覧で表示します</li>
        <li>翻訳した言葉のお気に入りを一覧で表示します</li>
        <li>翻訳した文章をすぐコピーして使用することができます</li>
        <li>音声によって発音を確認することができます</li>
      </Box>
    </Stack>
  </Container>
);

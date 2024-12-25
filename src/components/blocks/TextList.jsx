import { useContext } from 'react';
import { Box, Paper, IconButton, Container } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { DispatchContext } from './../providers/DispatchContext';
import { Star } from './Star';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

export const TextList = ({ data }) => {
  const dispatch = useContext(DispatchContext);

  // 削除ボタンのイベントハンドラー
  const onClickDelete = (e, id) => {
    dispatch({
      type: 'delete',
      payload: { id },
    });
  };

  // スターボタンのイベントハンドラー
  const onClickStar = (e, id) => {
    dispatch({
      type: 'star',
      payload: { id },
    });
  };

  return (
    <Container sx={{ mt: 2, mb: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="翻訳履歴テーブル">
          <TableHead>
            <TableRow>
              <StyledTableCell>翻訳前テキスト</StyledTableCell>
              <StyledTableCell>翻訳後テキスト</StyledTableCell>
              <StyledTableCell>スター</StyledTableCell>
              <StyledTableCell>削除</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id} hover sx={{ cursor: 'pointer' }}>
                {/* 翻訳前テキスト */}
                <StyledTableCell>
                  {d.fromText} ({d.fromLang})
                </StyledTableCell>

                {/* 翻訳後テキスト */}
                <StyledTableCell>
                  {d.toText} ({d.toLang})
                </StyledTableCell>

                {/* スターボタン */}
                <StyledTableCell>
                  <IconButton
                    aria-label="star"
                    onClick={(e) => onClickStar(e, d.id)}
                  >
                    <Star isStar={d.isStar} />
                  </IconButton>
                </StyledTableCell>

                {/* 削除ボタン */}
                <StyledTableCell>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={(e) => onClickDelete(e, d.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

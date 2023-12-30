import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import {
  clearApiState,
  getGraphqlState,
  getIntrospection,
} from 'src/store/slice/graphql.slice';
import { useText } from 'src/hooks/useText';
import { clearPath, closeDocs } from 'src/store/slice/DocSlice';

const EXAMPLE_API = [
  'https://rickandmortyapi.com/graphql',
  'https://graphqlzero.almansi.me/api',
  'https://graphql.anilist.co',
  'https://beta.pokeapi.co/graphql/v1beta',
  'https://countries.trevorblades.com/graphql',
];

export default function InputApi() {
  const { isLoading, urlApi } = useAppSelector(getGraphqlState);

  const [valueApi, setValueApi] = useState('');
  const [valueAutocomplete, setValueAutocomplete] = useState(
    urlApi || EXAMPLE_API[0]
  );

  const dispatch = useAppDispatch();
  const T = useText();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(clearPath());
    dispatch(closeDocs());

    if (urlApi) {
      dispatch(clearApiState());
      setValueApi('');
      return;
    }

    if (valueApi) {
      dispatch(getIntrospection({ api: valueApi }));
    }
  };

  return (
    <Grid
      container
      my={1}
      component={'form'}
      data-testid="component-input-api"
      flexWrap={'nowrap'}
      alignItems={'center'}
      gap={1}
      sx={{ paddingLeft: 3, paddingRight: 3 }}
      onSubmit={handleSubmit}
    >
      <Autocomplete
        id="api"
        options={EXAMPLE_API}
        value={valueAutocomplete}
        onChange={(_, option) => {
          if (option) {
            setValueAutocomplete(option);
          }
        }}
        inputValue={valueApi}
        onInputChange={(_, newInputValue) => setValueApi(newInputValue)}
        disableClearable
        disabled={isLoading || !!urlApi}
        freeSolo
        sx={{ maxWidth: '500px', width: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            InputLabelProps={{ sx: { paddingLeft: 1 } }}
            label={T.INPUT_API}
            variant="standard"
          />
        )}
      />
      <Button
        variant="contained"
        sx={{ p: '2px 8px', marginTop: 1, minWidth: '0px' }}
        type="submit"
        disabled={isLoading}
        data-testid="btn-submit-api"
      >
        {!urlApi ? (
          <SendIcon color={'action'} />
        ) : (
          <CancelScheduleSendIcon color={'action'} />
        )}
      </Button>
    </Grid>
  );
}

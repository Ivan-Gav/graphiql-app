import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLangContext } from 'src/context/useLangContext';
import { useText } from 'src/hooks/useText';
import { Lang } from 'src/models/models';

export default function BasicSelect() {
  const { lang, setLang } = useLangContext();
  const T = useText();

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as Lang);
  };

  return (
    <FormControl
      variant="standard"
      size="small"
      margin="normal"
      sx={{ margin: '5px 0 0 16px' }}
    >
      <Select
        id="lang-select"
        value={lang}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
        disableUnderline
      >
        <MenuItem selected={lang === 'EN'} value={'EN' as Lang}>
          {T.LANG_EN}
        </MenuItem>
        <MenuItem selected={lang === 'RU'} value={'RU' as Lang}>
          {T.LANG_RU}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

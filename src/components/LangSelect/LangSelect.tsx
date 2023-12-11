import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLangContext } from '../../context/useLangContext';
import { Lang } from '../../models/models';
import { T } from '../../constants/text';

export default function BasicSelect() {
  const { lang, setLang } = useLangContext();

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
          {T.LANG_EN[lang]}
        </MenuItem>
        <MenuItem selected={lang === 'RU'} value={'RU' as Lang}>
          {T.LANG_RU[lang]}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

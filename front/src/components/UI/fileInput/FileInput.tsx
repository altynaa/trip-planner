import {Button, Grid, TextField} from '@mui/material';
import React, {useRef, useState} from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string
}

const FileInput: React.FC<Props> = ({onChange, label, name}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button type="button" variant="contained" onClick={activateInput}>Browse</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
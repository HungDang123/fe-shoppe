import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Combobox({ item, handleChange, valueDefault }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-role"
          select
          label={valueDefault?.label}
          defaultValue=""
          onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem value={valueDefault?.value} disabled>
            {valueDefault?.label}
          </MenuItem>
          {item.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

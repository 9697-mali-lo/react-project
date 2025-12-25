import TextField from '@mui/material/TextField';

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}

export const AuthInput = ({ label, type = 'text', value, onChange }: AuthInputProps) => (
  <TextField
    margin="normal"
    required
    fullWidth
    variant="filled"
    label={label}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
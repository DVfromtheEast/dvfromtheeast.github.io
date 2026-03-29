import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

type DVTextFieldProps = Omit<TextFieldProps, 'variant'> & {
    label?: string;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
};

export default function DVTextField({
    label,
    placeholder,
    error,
    helperText,
    disabled,
    ...rest
}: DVTextFieldProps) {
    const theme = useTheme();
    return (
        <TextField
            fullWidth
            variant="outlined"
            label={label}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            disabled={disabled}
            {...rest}
            sx={{
                height: "100%",
                '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    fontSize: 14,
                    height: "100%",
                    background: alpha(theme.palette.background.paper, 0.8),

                    '&.Mui-focused fieldset': {
                        borderColor: theme => theme.palette.primary.main,
                    },
                    '&.Mui-disabled fieldset': {
                        borderColor: 'action.disabled',
                    },
                },
                '& .MuiInputLabel-root': {
                    fontSize: 14,
                    color: theme => theme.palette.text.primary,
                    '&.Mui-focused': {
                        color: theme => theme.palette.primary.main,
                    },
                    '&.Mui-disabled': {
                        color: 'text.disabled',
                    },
                },
                '& input': {
                    color: 'text.primary',
                    '&::placeholder': {
                        color: theme => theme.palette.text.primary,
                        opacity: 0.5,
                    },
                },
                '& .MuiFormHelperText-root': {
                    fontSize: 11,
                    marginLeft: 0,
                },
                ...((rest.sx as object) ?? {}),
            }}
        />
    );
}
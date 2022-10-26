import { Box, TextField, TextFieldProps } from '@mui/material';
import { Control, FieldError, useController } from 'react-hook-form';
type InputFieldProps = TextFieldProps & {
    name: string;
    label?: string;
    control: Control<any>;
};
export default function InputField({ name, label, control, ...rest }: InputFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <Box>
            <TextField
                label={label}
                onChange={(e) => onChange((e as any).target.value)}
                name={name}
                value={value}
                onBlur={onBlur}
                error={error ? true : false}
                inputRef={ref}
                {...rest}
            />
            <Box component="p" color="red">
                {(error as FieldError)?.message}
            </Box>
        </Box>
    );
}

import { Button, ButtonProps, CircularProgress } from '@mui/material'
import { ReactNode } from 'react'
import { alpha, Theme } from '@mui/material/styles'


type CustomVariant =
    | 'primary'
    | 'outline'
    | 'ghost'
    | 'danger'

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
    customVariant?: CustomVariant
    loading?: boolean
    children: ReactNode
}
export default function DVButton({
    customVariant = 'primary',
    loading = false,
    children,
    sx,
    disabled,
    ...props
}: CustomButtonProps) {
    const getVariantStyles = (theme: Theme) => {
        switch (customVariant) {
            case 'primary':
                return {
                    border: '1px solid',
                    borderColor: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.85),
                    color: 'primary.contrastText',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                    },
                }

            case 'outline':
                return {
                    border: '1px solid',
                    borderColor: 'text.primary',
                    backgroundColor: 'transparent',
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                    },
                }

            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }

            case 'danger':
                return {
                    backgroundColor: 'error.main',
                    color: 'error.contrastText',
                    '&:hover': {
                        backgroundColor: 'error.light',
                    },
                }

            default:
                return {}
        }
    }

    return (
        <Button
            disableElevation
            disabled={disabled || loading}
            sx={(theme) => ({
                borderRadius: 0,
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.5,
                letterSpacing: 0.5,
                fontFamily: 'Noto Sans Variable',
                textTransform: 'uppercase',
                transition: 'all 0.1s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                },
                ...getVariantStyles(theme),
                sx,
            })}
            {...props}
        >
            {loading ? (
                <CircularProgress size={20} thickness={6} sx={(theme) => ({
                    color: theme.palette.text.primary,
                })} />
            ) : (
                children
            )}
        </Button>
    )
}
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();
const primaryColor = '#1a4255';
const secondaryColor = '#00b100';

const MROTheme = createMuiTheme({
    palette: {
        common: {
            white: "#fff"
        },
        primary: {
            main: primaryColor || "#145999"
        },
        secondary: {
            main: secondaryColor || "#26B4E8"
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            'Oxygen',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        subtitle2: {
            fontWeight: 'bold'
        },
        subtitle1: {
            fontSize: '0.9rem'
        },
        colorSuccess: defaultTheme.palette.success.dark,
        colorWarning: defaultTheme.palette.warning.dark
    },
    overrides: {
        MuiTypography: {
            colorSuccess: defaultTheme.palette.success.dark,
            colorWarning: defaultTheme.palette.warning.dark
        },
        MuiButton: {
            root: {
                textTransform: "none",
                fontWeight: 400,
                minWidth: 100,
                fontSize: '1rem',
                borderRadius: "3px",
                boxShadow: 'unset',
            },
            containedSecondary: {
                color: '#ffffff'
            },
        },

        MuiTableCell: {
            root: {
                padding: '5px',
                [defaultTheme.breakpoints.down("xs")]: {
                    padding: '16px'
                }
            },
            head: {
                fontWeight: 'bold'
            }
        },
        MuiCardContent: {
            root: {
                '&:last-child': {
                    paddingBottom: '10px'
                }
            }
        },
        MuiIconButton: {
            root: {
                padding: '5px'
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(255, 252, 252, 0.34)"
            }
        },
        MuiMenuItem: {
            root: {
                '&.Mui-selected': {
                    backgroundColor: primaryColor ? `${primaryColor}2A` : "rgba(0, 0, 0, 0.15)"
                }
            }
        },
        MuiChip: {
            root: {
                backgroundColor: "#e0e0e073"
            },
            deleteIcon: {
                color: "rgba(0, 0, 0, 0.1)"
            }
        },
        MuiSvgIcon: {
            fontSizeSmall: {
                fontSize: '1rem'
            }
        },
        MuiSelect: {
            root: {
                fontSize: "14px"
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.9rem'
            }
        },
        MuiToggleButton: {
            root: {
                minWidth: '60px',
                padding: '5px 10px',
                color: primaryColor || "#145999",
                borderColor: primaryColor || "#145999",
                '&$selected': {
                    backgroundColor: primaryColor || "#145999",
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: 'auto',
                        color: '#fff'
                    }
                },
                '&:hover': {
                    backgroundColor: 'auto',
                    color: '#000'
                }
            },
        },
        MuiAutocomplete: {
            inputRoot: {
                minHeight: '47.094px'
            },
            input: {
                marginTop: '-5px'
            }
        },
        MuiPickersDateRangePickerInput: {
            root: {
                width: '25rem'
            }
        },
        MuiOutlinedInput: {
            root: {
                height: '3rem'
            },
            inputMultiline: {
                padding: '0 !important'
            },
            inputAdornedStart: {
                paddingLeft: '0px !important'
            }
        },
        MuiInputLabel: {
            outlined: {
                color: primaryColor,
                // background: defaultTheme.palette.common.white,
                paddingRight: defaultTheme.spacing(1),
            },
        },
        MuiInputAdornment: {
            positionStart: {
                marginRight: '0px'
            }
        },
    }
})
    ;

export default MROTheme;
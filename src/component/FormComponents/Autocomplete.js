import { Box, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useEffect, useState } from 'react'

export default function MROAutocomplete({ options = [], label, optionLabel, getState = (data) => { return data }, multiple, limitTags }) {

    const [state, setState] = useState([])
    useEffect(() => {

        getState(state)

    }, [state && state.length])

    return (
        <Box pt={1.5}>
            <Autocomplete
                fullWidth
                id="combo-box-forest"
                multiple={multiple}
                limitTags={limitTags}
                onChange={(event, newValue, reason) => {
                    setState(newValue)
                }}
                options={options && options.map(item => {
                    return item
                })}
                getOptionLabel={(option) => option[optionLabel]}
                renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
            />
        </Box>
    )
}

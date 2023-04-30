import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { MultipleSelectProps } from '@/interfaces/multipleselect'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export const MultipleSelect = ({ toyLabels, handleChange }: MultipleSelectProps) => {

    const labels = [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor'
    ]

    return <div>
        <FormControl sx={{ width: '100%' }}>
            <InputLabel id='demo-multiple-checkbox-label'>Labels</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                name='labels'
                value={toyLabels}
                onChange={handleChange}
                input={<OutlinedInput label="label" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {labels.map(label => (
                    <MenuItem key={label} value={label}>
                        <Checkbox checked={toyLabels.indexOf(label) > -1} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
}
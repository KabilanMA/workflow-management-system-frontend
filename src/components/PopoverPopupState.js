import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import CircleIcon from '@mui/icons-material/Circle';

export default function PopoverPopupState() {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                        Show color meanings
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>
                            <CircleIcon color='warning' fontSize='small' /> subtask was completed after the dealine has passed<br />
                            <CircleIcon color='success' fontSize='small' /> means subtask was completed before the deadline<br />
                            <CircleIcon color='grey' fontSize='small' /> means subtask is partially finished<br />
                            <CircleIcon color='error' fontSize='small' /> means subtask is not yet finished<br />
                            <CircleIcon color='info' fontSize='small' /> task not yet finished and the dealine has not yet passed
                            .</Typography>
                    </Popover>
                </div>
            )}
        </PopupState>

    );
}
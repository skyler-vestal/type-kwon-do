import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

const HoverTooltip = ({ children }) => {
  const [open, setOpen] = useState(false);
  let timeout = 500;

  const handleTooltipOpen = () => {
    timeout = setTimeout(() => {
      setOpen(true);
    }, 500); // Wait for 0.5 seconds before showing
  };

  const handleTooltipClose = () => {
    clearTimeout(timeout); // Clear the timeout if you leave before 0.5s
    setOpen(false); // Close tooltip immediately
  };

  return (
    <Tooltip
      title={char.disabled ? "Never Used" : char.roman}
      followCursor={true}
      TransitionComponent={Fade}
      open={open}
      onOpen={handleTooltipOpen}
      onClose={handleTooltipClose}
      disableHoverListener={false}
    >
      {/* Here’s where your children (the content inside) go */}
      <span onMouseEnter={handleTooltipOpen} onMouseLeave={handleTooltipClose}>
        {children}
      </span>
    </Tooltip>
  );
};
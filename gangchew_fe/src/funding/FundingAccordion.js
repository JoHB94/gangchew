import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//writer를 prop으로 받는다.

export default function FundingAccordion({user}) {
  const [expanded, setExpanded] = React.useState(false);
  const writerName = user.fullname;
  const writerEmail = user.email;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <h3>문의사항</h3>
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <h3>{writerName}</h3>
            <span>{writerEmail}</span>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
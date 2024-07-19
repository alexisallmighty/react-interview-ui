import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import Button from '@mui/material/Button';
import { Widget } from '../../lib/apiConnect';

export interface DisplayWidgetProps {
  widget: Widget;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
}

const DisplayWidget = ({
  widget,
  onEdit,
  onDelete,
}: DisplayWidgetProps): JSX.Element => {
  const { description, name, price } = widget;

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>

            <Typography component="div" gutterBottom variant="h5">
              ${price}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
            <Button variant="outlined" color="primary" onClick={onEdit}>
              Edit
            </Button>

            <Button variant="outlined" color="error" onClick={onDelete}>
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DisplayWidget;

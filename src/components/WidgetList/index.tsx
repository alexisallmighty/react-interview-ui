import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { deleteWidget, fetchAllWidgets, Widget } from '../../lib/apiConnect';
import WidgetDisplay from '../WidgetDisplay';
import WidgetForm from '../WidgetForm';

const WidgetList = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [currentWidget, setCurrentWidget] = useState<Widget | undefined>();

  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error('Error fetching widgets', error));
  }, []);

  const handleCreate = () => {
    setCurrentWidget(undefined);
    setFormOpen(true);
  };

  const handleEdit = (widget: Widget) => {
    setCurrentWidget(widget);
    setFormOpen(true);
  };

  const handleSave = () => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error('Error fetching widgets', error));
  };

  const handleDelete = ({ name }: Widget) => {
    deleteWidget(name)
      .then(() => {
        setWidgets(widgets.filter((widget) => widget.name !== name));
      })
      .catch((error) => console.error('Error deleting widget', error));
  };

  const handleCancel = () => {
    setCurrentWidget(undefined);
    setFormOpen(false);
  };

  return (
    <Stack
      spacing={4}
      sx={{ margin: 'auto', maxWidth: 900, paddingTop: '4em', width: '100%' }}
    >
      <Button onClick={handleCreate} variant="outlined" color="primary">
        Add Widget
      </Button>

      <WidgetForm
        open={formOpen}
        onCancel={handleCancel}
        onSave={handleSave}
        widget={currentWidget}
      />

      <Typography sx={{ textAlign: 'center' }} variant="h3">
        List of widgets:
      </Typography>

      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingRight: 4, width: '100%' }}
      >
        {widgets.map((current, index) => (
          <WidgetDisplay
            key={index}
            widget={current}
            onEdit={() => handleEdit(current)}
            onDelete={() => handleDelete(current)}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default WidgetList;

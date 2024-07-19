import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Widget, createWidget, updateWidget } from '../../lib/apiConnect';

export interface WidgetFormProps {
  open: boolean;
  onCancel: VoidFunction;
  onSave: (widget: Widget) => void;
  widget?: Widget;
}

const WidgetForm = ({ open, onCancel, onSave, widget }: WidgetFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice(0);
  };

  const handleSave = () => {
    const formWidget = { name, description, price };

    if (widget) {
      updateWidget(formWidget)
        .then(() => {
          onSave(formWidget);
          onCancel();
        })
        .catch((error) => {
          console.error('Error updating widget', error);
        });
    } else {
      createWidget(formWidget)
        .then(() => {
          onSave(formWidget);
          onCancel();
        })
        .catch((error) => {
          console.error('Error creating widget', error);
        });
    }
  };

  const setForm = () => {
    if (widget) {
      setName(widget.name);
      setDescription(widget.description);
      setPrice(widget.price);
    } else {
      resetForm();
    }
  };

  useEffect(() => {
    setForm();
  }, [open]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{widget ? 'Edit Widget' : 'Add Widget'}</DialogTitle>

      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={widget ? true : false}
        />

        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="outlined" color="primary" onClick={handleSave}>
          {widget ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetForm;

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Widget } from '../../lib/apiConnect';
import WidgetForm from './index';

describe('WidgetForm', () => {
  // Mock functions
  const onCancel = jest.fn();
  const onSave = jest.fn();

  const renderForm = (widget?: Widget) => {
    render(
      <WidgetForm
        open={true}
        onCancel={onCancel}
        onSave={onSave}
        widget={widget}
      />
    );
  };

  it('displays all fields for create', () => {
    renderForm();

    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/)).toBeInTheDocument();
  });

  it('displays all fields for update', () => {
    const widget: Widget = {
      description: 'New description',
      name: 'Existing name',
      price: 1000.25,
    };

    renderForm(widget);

    expect(screen.getByLabelText(/Name/)).toHaveValue(widget.name);
    expect(screen.getByLabelText(/Description/)).toHaveValue(
      widget.description
    );
    expect(screen.getByLabelText(/Price/)).toHaveValue(widget.price);
  });
});

import { render, screen } from '@testing-library/react';

import { Widget } from '../../lib/apiConnect';
import WidgetDisplay from './index';

describe('WidgetDisplay', () => {
  // Mock functions
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  it('displays all widget information', async () => {
    const widget: Widget = {
      description: 'German movie star',
      name: 'Widget von Hammersmark',
      price: 19.45,
    };

    render(
      <WidgetDisplay onEdit={onEdit} onDelete={onDelete} widget={widget} />
    );

    expect(
      screen.queryByText(widget.description, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(widget.name, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(widget.price, { exact: false })
    ).toBeInTheDocument();
  });
});

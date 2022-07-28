import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination />', () => {
  it('displays a loading message', () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });

  it('should render pagination for 18 items', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    expect(container).toHaveTextContent('Page 1 of 5');
    const pageCountSpan = screen.getByTestId('pageCount');
    expect(pageCountSpan).toHaveTextContent('18');
    expect(container).toMatchSnapshot();
  });

  it('should disalbe prev button page on first page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevBtn = screen.getByText(/Prev/);
    const nextBtn = screen.getByText(/Next/);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'true');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'false');
  });
  it('should disalbe next button page on last page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={3} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevBtn = screen.getByText(/Prev/);
    const nextBtn = screen.getByText(/Next/);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'false');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'true');
  });
  it('should enable all buttons on the middle page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={2} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});

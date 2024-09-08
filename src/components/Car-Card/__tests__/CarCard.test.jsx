import React from 'react';
import { render, screen } from '@testing-library/react';
import CarCard from '../CarCard';
import '@testing-library/jest-dom';

describe('CarCard Component', () => {
  const car = {
    imageUrl: "test-image.jpg",
    carName: "Test Car",
    kmNumeric: "20000",
    fuel: "Petrol",
    areaName: "Test Area",
    cityName: "Test City",
    price: "5 Lakh"
  };

  test('renders car details correctly', () => {
    render(<CarCard car={car} />);

    expect(screen.getByText('Test Car')).toBeInTheDocument();
    expect(screen.getByText('20000km | Petrol | Test Area, Test City')).toBeInTheDocument();
    expect(screen.getByText('Rs 5 Lakh')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<CarCard car={car} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

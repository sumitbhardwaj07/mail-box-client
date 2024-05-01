import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EmailForm from './EmailForm';


describe('EmailForm component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
  test('renders form inputs and button', () => {
    render(<EmailForm />);
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Recipient's Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Send Email')).toBeInTheDocument();
  });


test('disables inputs and button while loading', async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;

    render(<EmailForm />);
    const recipientInput = screen.getByPlaceholderText("Recipient's Email");
    const subjectInput = screen.getByPlaceholderText('Subject');
    const sendButton = screen.getByText('Send Email');

    fireEvent.change(recipientInput, { target: { value: 'test@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.click(sendButton);

    expect(recipientInput).toBeDisabled();
    expect(subjectInput).toBeDisabled();
    expect(sendButton).toBeDisabled();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(recipientInput).not.toBeDisabled();
      expect(subjectInput).not.toBeDisabled();
      expect(sendButton).not.toBeDisabled();
    });
  });


  test('renders form inputs and button', () => {
    render(<EmailForm />);
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Recipient's Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Send Email')).toBeInTheDocument();
  });




  test('disables inputs and button while loading', async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;

    render(<EmailForm />);
    const recipientInput = screen.getByPlaceholderText("Recipient's Email");
    const subjectInput = screen.getByPlaceholderText('Subject');
    const sendButton = screen.getByText('Send Email');

    fireEvent.change(recipientInput, { target: { value: 'test@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.click(sendButton);

    expect(recipientInput).toBeDisabled();
    expect(subjectInput).toBeDisabled();
    expect(sendButton).toBeDisabled();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(recipientInput).not.toBeDisabled();
      expect(subjectInput).not.toBeDisabled();
      expect(sendButton).not.toBeDisabled();
    });
  });


  
 });
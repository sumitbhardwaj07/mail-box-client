import EmailViewer from "./EmailViewer";
import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";


global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        email1: {
          recipient: "test1@example.com",
          subject: "Test Subject 1",
          body: "Test Body 1",
        },
        email2: {
          recipient: "test2@example.com",
          subject: "Test Subject 2",
          body: "Test Body 2",
        },
      }),
  })
);

describe("EmailViewer component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test("renders loading state initially", async () => {
    render(<EmailViewer />);
    expect(
      screen.getByText("Loading emails, please wait...")
    ).toBeInTheDocument();
    await waitFor(() => {});
  });

  test("renders error message if fetching emails fails", async () => {

    global.fetch.mockRejectedValueOnce({ message: "Failed to fetch" });
  
    render(<EmailViewer />);
    expect(await screen.findByText(text => text.includes('Error loading emails:'))).toBeInTheDocument();
  });
  
  

  test("renders 'no emails found' message if no emails are returned", async () => {

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  
    render(<EmailViewer />);
    expect(await screen.findByText(text => text.includes('No emails found'))).toBeInTheDocument();
  });
  


});

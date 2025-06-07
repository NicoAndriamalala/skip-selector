import { render, screen, waitFor } from "@testing-library/react";
import SkipSelector from "./SkipSelector";

// Mock fetch for testing
global.fetch = jest.fn();

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("SkipSelector Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    (fetch as jest.Mock).mockClear();
  });

  test("renders loading state initially", () => {
    // Mock pending fetch
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<SkipSelector />);

    expect(screen.getByText("Loading skip options...")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders header text after loading", async () => {
    // Mock successful fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<SkipSelector />);

    // Wait for loading to complete and check header
    await waitFor(() => {
      expect(screen.getByText("Choose Your Skip Size")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Select the skip size that best suits your needs")
    ).toBeInTheDocument();
  });

  test("renders progress bar after loading", async () => {
    // Mock successful fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<SkipSelector />);

    // Wait for progress bar elements to appear
    await waitFor(() => {
      expect(screen.getByText("Postcode")).toBeInTheDocument();
    });

    expect(screen.getByText("Waste Type")).toBeInTheDocument();
    expect(screen.getByText("Select Skip")).toBeInTheDocument();
  });

  test("handles fetch error gracefully", async () => {
    // Mock fetch error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<SkipSelector />);

    // Wait for error state
    await waitFor(() => {
      expect(
        screen.getByText("Oops! Something went wrong")
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  test("renders skip cards when data is loaded", async () => {
    // Mock successful fetch with sample data
    const mockSkips = [
      {
        id: 1,
        size: 4,
        hire_period_days: 14,
        transport_cost: null,
        per_tonne_cost: null,
        price_before_vat: 278,
        vat: 20,
        postcode: "NR32",
        area: "",
        forbidden: false,
        created_at: "2025-04-03T13:51:46.897146",
        updated_at: "2025-04-07T13:16:52.813",
        allowed_on_road: true,
        allows_heavy_waste: true,
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSkips,
    });

    render(<SkipSelector />);

    // Wait for skip cards to appear
    await waitFor(() => {
      expect(screen.getByText("4 Yard Skip")).toBeInTheDocument();
    });

    expect(screen.getByText("£334")).toBeInTheDocument(); // 278 * 1.2 = 333.6 rounded to 334
    expect(screen.getByText("14 day hire period")).toBeInTheDocument();
  });

  test("shows warning badge for skips not allowed on road", async () => {
    // Mock skip that's not allowed on road
    const mockSkips = [
      {
        id: 1,
        size: 10,
        hire_period_days: 14,
        transport_cost: null,
        per_tonne_cost: null,
        price_before_vat: 400,
        vat: 20,
        postcode: "NR32",
        area: "",
        forbidden: false,
        created_at: "2025-04-03T13:51:46.897146",
        updated_at: "2025-04-07T13:16:52.813",
        allowed_on_road: false,
        allows_heavy_waste: false,
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSkips,
    });

    render(<SkipSelector />);

    // Wait for skip cards to appear and check for warning badge
    await waitFor(() => {
      expect(screen.getByText("10 Yard Skip")).toBeInTheDocument();
    });

    expect(screen.getByText("⚠️ Not Allowed On The Road")).toBeInTheDocument();
  });
});

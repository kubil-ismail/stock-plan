// Mock stock data
export const mockStocks = [
  {
    id: '1',
    code: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    subSector: 'Consumer Electronics',
    industry: 'Hardware',
    subIndustry: 'Computer & Phone Manufacturing',
    price: 178.52,
    change: 2.45,
    changePercent: 1.39,
    volume: '52.0M',
    marketCap: '2.8T',
    peRatio: '29.5',
    dividendYield: '0.52%',
    trend: [175, 176, 174, 177, 178, 180, 179, 178.52],
    overview: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories. Apple also sells various related services.',
  },
  {
    id: '2',
    code: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    subSector: 'Software',
    industry: 'Software',
    subIndustry: 'Application Software',
    price: 412.35,
    change: -3.21,
    changePercent: -0.77,
    volume: '28.0M',
    marketCap: '3.1T',
    peRatio: '35.2',
    dividendYield: '0.73%',
    trend: [415, 416, 414, 413, 410, 411, 413, 412.35],
    overview: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in Productivity and Business Processes, Intelligent Cloud, and More Personal Computing segments.',
  },
  {
    id: '3',
    code: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    subSector: 'Internet Services',
    industry: 'Software',
    subIndustry: 'Internet Software & Services',
    price: 142.87,
    change: 4.12,
    changePercent: 2.97,
    volume: '31.0M',
    marketCap: '1.8T',
    peRatio: '26.8',
    dividendYield: '0.00%',
    trend: [138, 139, 140, 141, 140, 142, 143, 142.87],
    overview: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America. The company operates through Google Services, Google Cloud, and Other Bets segments.',
  },
  {
    id: '4',
    code: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer',
    subSector: 'E-commerce',
    industry: 'Retail',
    subIndustry: 'Internet & Direct Marketing Retail',
    price: 178.25,
    change: 5.67,
    changePercent: 3.28,
    volume: '45.0M',
    marketCap: '1.9T',
    peRatio: '52.3',
    dividendYield: '0.00%',
    trend: [172, 173, 175, 176, 177, 178, 179, 178.25],
    overview: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS).',
  },
  {
    id: '5',
    code: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive',
    subSector: 'Electric Vehicles',
    industry: 'Automotive',
    subIndustry: 'Automobile Manufacturers',
    price: 198.32,
    change: -8.45,
    changePercent: -4.09,
    volume: '120.0M',
    marketCap: '630.5B',
    peRatio: '58.2',
    dividendYield: '0.00%',
    trend: [210, 208, 205, 202, 200, 199, 197, 198.32],
    overview: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments: Automotive and Energy Generation and Storage.',
  },
  {
    id: '6',
    code: 'JPM',
    name: 'JPMorgan Chase',
    sector: 'Financial',
    subSector: 'Banking',
    industry: 'Financial Services',
    subIndustry: 'Diversified Banks',
    price: 185.42,
    change: 1.23,
    changePercent: 0.67,
    volume: '12.0M',
    marketCap: '536.8B',
    peRatio: '11.2',
    dividendYield: '2.45%',
    trend: [183, 184, 184.5, 185, 184, 185.5, 186, 185.42],
    overview: 'JPMorgan Chase & Co. operates as a financial services company worldwide. It operates through four segments: Consumer & Community Banking (CCB), Corporate & Investment Bank (CIB), Commercial Banking (CB), and Asset & Wealth Management (AWM).',
  },
];

// User positions in stocks
export const mockUserPositions: Record<string, {
  totalBuy: number;
  averagePrice: number;
  totalLot: number;
  currentPrice: number;
  profitLoss: number;
  profitLossPercent: number;
  miniTrend: number[];
}> = {
  'AAPL': {
    totalBuy: 17500,
    averagePrice: 175.00,
    totalLot: 100,
    currentPrice: 178.52,
    profitLoss: 352,
    profitLossPercent: 2.01,
    miniTrend: [175, 176, 174, 177, 178, 180, 179, 178.52],
  },
  'MSFT': {
    totalBuy: 41000,
    averagePrice: 410.00,
    totalLot: 100,
    currentPrice: 412.35,
    profitLoss: 235,
    profitLossPercent: 0.57,
    miniTrend: [410, 411, 409, 411, 412, 413, 412, 412.35],
  },
  'GOOGL': {
    totalBuy: 13500,
    averagePrice: 135.00,
    totalLot: 100,
    currentPrice: 142.87,
    profitLoss: 787,
    profitLossPercent: 5.83,
    miniTrend: [135, 137, 138, 140, 141, 142, 143, 142.87],
  },
};

// Corporate structure data
export const mockCorporateInfo: Record<string, {
  secretary: string;
  headquarters?: string;
  founded?: string;
  website?: string;
  shareholders: { name: string; percentage: number }[];
  directors: { name: string; position: string }[];
  commissioners: { name: string; position: string }[];
  subsidiaries: string[];
}> = {
  'AAPL': {
    secretary: 'Kate Adams',
    headquarters: 'Cupertino, California, USA',
    founded: '1976',
    website: 'https://www.apple.com',
    shareholders: [
      { name: 'The Vanguard Group', percentage: 8.45 },
      { name: 'BlackRock', percentage: 7.23 },
      { name: 'Berkshire Hathaway', percentage: 5.89 },
      { name: 'State Street Corporation', percentage: 4.12 },
      { name: 'Other Institutional Investors', percentage: 52.31 },
      { name: 'Retail Investors', percentage: 22.00 },
    ],
    directors: [
      { name: 'Tim Cook', position: 'Chief Executive Officer' },
      { name: 'Luca Maestri', position: 'Chief Financial Officer' },
      { name: 'Jeff Williams', position: 'Chief Operating Officer' },
      { name: 'Katherine Adams', position: 'General Counsel' },
      { name: 'Deirdre O\'Brien', position: 'Senior VP Retail' },
    ],
    commissioners: [
      { name: 'Arthur D. Levinson', position: 'Chairman' },
      { name: 'James Bell', position: 'Independent Director' },
      { name: 'Al Gore', position: 'Independent Director' },
      { name: 'Andrea Jung', position: 'Independent Director' },
    ],
    subsidiaries: [
      'Beats Electronics',
      'FileMaker Inc.',
      'Apple Energy LLC',
      'Braeburn Capital',
    ],
  },
  'MSFT': {
    secretary: 'Hossein Nowbar',
    shareholders: [
      { name: 'The Vanguard Group', percentage: 8.97 },
      { name: 'BlackRock', percentage: 7.45 },
      { name: 'State Street Corporation', percentage: 4.23 },
      { name: 'Fidelity', percentage: 3.89 },
      { name: 'Other Institutional Investors', percentage: 54.46 },
      { name: 'Retail Investors', percentage: 21.00 },
    ],
    directors: [
      { name: 'Satya Nadella', position: 'Chief Executive Officer' },
      { name: 'Amy Hood', position: 'Chief Financial Officer' },
      { name: 'Brad Smith', position: 'President' },
      { name: 'Judson Althoff', position: 'EVP & Chief Commercial Officer' },
    ],
    commissioners: [
      { name: 'Satya Nadella', position: 'Chairman & CEO' },
      { name: 'Reid Hoffman', position: 'Independent Director' },
      { name: 'Hugh Johnston', position: 'Independent Director' },
      { name: 'Teri List', position: 'Independent Director' },
    ],
    subsidiaries: [
      'LinkedIn Corporation',
      'GitHub, Inc.',
      'Activision Blizzard',
      'Nuance Communications',
    ],
  },
  'GOOGL': {
    secretary: 'Halimah DeLaine Prado',
    shareholders: [
      { name: 'Larry Page', percentage: 5.8 },
      { name: 'Sergey Brin', percentage: 5.6 },
      { name: 'The Vanguard Group', percentage: 7.2 },
      { name: 'BlackRock', percentage: 6.8 },
      { name: 'Other Institutional Investors', percentage: 52.6 },
      { name: 'Retail Investors', percentage: 22.0 },
    ],
    directors: [
      { name: 'Sundar Pichai', position: 'Chief Executive Officer' },
      { name: 'Ruth Porat', position: 'Chief Financial Officer' },
      { name: 'Prabhakar Raghavan', position: 'Senior VP, Google Search' },
      { name: 'Philipp Schindler', position: 'Senior VP, Global Sales' },
    ],
    commissioners: [
      { name: 'John Hennessy', position: 'Chairman' },
      { name: 'Frances Arnold', position: 'Independent Director' },
      { name: 'Roger Ferguson', position: 'Independent Director' },
      { name: 'Ann Mather', position: 'Independent Director' },
    ],
    subsidiaries: [
      'Google LLC',
      'YouTube LLC',
      'Waymo LLC',
      'Verily Life Sciences',
      'DeepMind',
    ],
  },
};

// Mock sectors
export const mockSectors = [
  {
    id: 'technology',
    name: 'Technology',
    change: 1.45,
    changePercent: 1.45,
    marketCap: 4500000000000,
    trend: [100, 102, 101, 103, 105, 104, 106, 107],
    stockCount: 145,
  },
  {
    id: 'financial',
    name: 'Financial',
    change: 0.82,
    changePercent: 0.82,
    marketCap: 3200000000000,
    trend: [100, 99, 100, 101, 102, 101, 102, 103],
    stockCount: 89,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    change: -0.45,
    changePercent: -0.45,
    marketCap: 2800000000000,
    trend: [100, 101, 99, 98, 99, 98, 97, 96],
    stockCount: 67,
  },
  {
    id: 'consumer',
    name: 'Consumer',
    change: 2.15,
    changePercent: 2.15,
    marketCap: 2100000000000,
    trend: [100, 103, 105, 104, 106, 107, 108, 110],
    stockCount: 112,
  },
  {
    id: 'energy',
    name: 'Energy',
    change: -1.32,
    changePercent: -1.32,
    marketCap: 1900000000000,
    trend: [100, 98, 97, 99, 98, 96, 95, 94],
    stockCount: 43,
  },
  {
    id: 'automotive',
    name: 'Automotive',
    change: 1.87,
    changePercent: 1.87,
    marketCap: 1500000000000,
    trend: [100, 102, 103, 104, 103, 105, 106, 107],
    stockCount: 28,
  },
];

// Mock indexes
export const mockIndexes = [
  {
    id: 'sp500',
    name: 'S&P 500',
    code: '^GSPC',
    value: 5127.48,
    change: 32.45,
    changePercent: 0.64,
    trend: [5080, 5090, 5100, 5095, 5110, 5120, 5125, 5127.48],
    stockCount: 503,
  },
  {
    id: 'nasdaq',
    name: 'NASDAQ Composite',
    code: '^IXIC',
    value: 16274.94,
    change: 125.32,
    changePercent: 0.78,
    trend: [16100, 16150, 16200, 16180, 16220, 16250, 16270, 16274.94],
    stockCount: 3500,
  },
  {
    id: 'dow',
    name: 'Dow Jones',
    code: '^DJI',
    value: 39087.38,
    change: -45.67,
    changePercent: -0.12,
    trend: [39150, 39140, 39120, 39100, 39090, 39085, 39080, 39087.38],
    stockCount: 30,
  },
];

// Mock portfolio positions
export const mockPortfolioOngoing = [
  {
    id: '1',
    stockCode: 'AAPL',
    stockName: 'Apple Inc.',
    action: 'BUY',
    lot: 100,
    targetPrice: 180.00,
    currentPrice: 178.52,
    status: 'Active',
    expiry: '2026-03-15',
    setupUsed: 'Breakout Strategy',
    targetExecutionTime: '2026-03-10 09:30',
  },
  {
    id: '2',
    stockCode: 'GOOGL',
    stockName: 'Alphabet Inc.',
    action: 'BUY',
    lot: 50,
    targetPrice: 145.00,
    currentPrice: 142.87,
    status: 'Pending',
    expiry: '2026-03-20',
    setupUsed: 'Support Bounce',
    targetExecutionTime: '2026-03-18 10:00',
  },
  {
    id: '3',
    stockCode: 'TSLA',
    stockName: 'Tesla Inc.',
    action: 'SELL',
    lot: 25,
    targetPrice: 195.00,
    currentPrice: 198.32,
    status: 'Active',
    expiry: '2026-03-12',
    setupUsed: 'Resistance Test',
    targetExecutionTime: '2026-03-11 14:30',
  },
];

export const mockPortfolioHistory = [
  {
    id: '4',
    stockCode: 'MSFT',
    stockName: 'Microsoft Corporation',
    action: 'BUY',
    lot: 75,
    entryPrice: 405.00,
    exitPrice: 412.35,
    status: 'Completed',
    realizedGain: 551.25,
    entryDate: '2026-02-15',
    exitDate: '2026-02-25',
    setupUsed: 'Trend Following',
  },
  {
    id: '5',
    stockCode: 'AMZN',
    stockName: 'Amazon.com Inc.',
    action: 'BUY',
    lot: 40,
    entryPrice: 182.00,
    exitPrice: 178.25,
    status: 'Completed',
    realizedGain: -150.00,
    entryDate: '2026-02-01',
    exitDate: '2026-02-20',
    setupUsed: 'Reversal Play',
  },
];

// Mock calendar events
export const mockCalendarEvents = [
  {
    id: '1',
    date: '2026-03-05',
    type: 'IPO',
    stockCode: 'NEWCO',
    stockName: 'New Company Inc.',
    description: 'Initial Public Offering - Expected price range $18-$22',
  },
  {
    id: '2',
    date: '2026-03-12',
    type: 'Dividend',
    stockCode: 'AAPL',
    stockName: 'Apple Inc.',
    description: 'Quarterly dividend payment - $0.24 per share',
  },
  {
    id: '3',
    date: '2026-03-15',
    type: 'Earnings',
    stockCode: 'GOOGL',
    stockName: 'Alphabet Inc.',
    description: 'Q1 2026 Earnings Report',
  },
  {
    id: '4',
    date: '2026-03-18',
    type: 'Split',
    stockCode: 'NVDA',
    stockName: 'NVIDIA Corporation',
    description: 'Stock split 10-for-1',
  },
  {
    id: '5',
    date: '2026-03-22',
    type: 'IPO',
    stockCode: 'TECH',
    stockName: 'Tech Startup Corp.',
    description: 'Initial Public Offering - Expected price range $25-$30',
  },
];

// Mock setups
export const mockSetups = [
  {
    id: '1',
    title: 'Breakout Strategy',
    description: 'Identifies stocks breaking above key resistance levels with strong volume',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    rules: [
      'Price breaks above 20-day high',
      'Volume increases by at least 50% above average',
      'Close above breakout level for 2 consecutive days',
      'RSI between 50-70',
    ],
    winRate: 68,
    avgGain: 12.5,
  },
  {
    id: '2',
    title: 'Support Bounce',
    description: 'Capitalizes on price rebounds from strong support zones',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop',
    rules: [
      'Price touches key support level (50 or 200 MA)',
      'RSI shows oversold conditions (below 30)',
      'Bullish reversal candlestick pattern',
      'Increasing volume on bounce day',
    ],
    winRate: 72,
    avgGain: 8.3,
  },
  {
    id: '3',
    title: 'Trend Following',
    description: 'Rides established uptrends with proper risk management',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop',
    rules: [
      'Stock in clear uptrend (price above 50 and 200 MA)',
      'Higher highs and higher lows pattern',
      'MACD bullish crossover',
      'Entry on pullback to 20-day MA',
    ],
    winRate: 65,
    avgGain: 15.2,
  },
  {
    id: '4',
    title: 'Resistance Test',
    description: 'Short positions at key resistance levels with tight stops',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop',
    rules: [
      'Price approaches major resistance level',
      'RSI showing overbought (above 70)',
      'Decreasing volume as price rises',
      'Bearish reversal pattern at resistance',
    ],
    winRate: 58,
    avgGain: 10.8,
  },
  {
    id: '5',
    title: 'Gap Fill Strategy',
    description: 'Profits from price gaps that tend to fill over time',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=400&h=250&fit=crop',
    rules: [
      'Significant gap up or down (>3%)',
      'Gap without fundamental news',
      'Wait for initial momentum to fade',
      'Enter when price starts moving back to fill gap',
    ],
    winRate: 70,
    avgGain: 6.5,
  },
  {
    id: '6',
    title: 'Reversal Play',
    description: 'Catches trend reversals at extreme price levels',
    thumbnail: 'https://images.unsplash.com/photo-1579532537902-1e50099867b4?w=400&h=250&fit=crop',
    rules: [
      'Extended move away from mean (>2 standard deviations)',
      'Multiple divergence signals',
      'Volume spike on reversal day',
      'Confirmed by candlestick pattern',
    ],
    winRate: 62,
    avgGain: 11.3,
  },
];

// Mock brokers
export const mockBrokers = [
  {
    id: '1',
    name: 'Stockbit',
    accountNumber: '1234567890',
    notes: 'Primary account for long-term investments',
  },
  {
    id: '2',
    name: 'Ajaib',
    accountNumber: '0987654321',
    notes: 'Active trading account',
  },
  {
    id: '3',
    name: 'Mirae Asset',
    accountNumber: '',
    notes: '',
  },
];

// Available broker options
export const availableBrokers = [
  'Stockbit',
  'Ajaib',
  'Mirae Asset',
  'IPOT',
  'BNI Sekuritas',
  'Mandiri Sekuritas',
  'BCA Sekuritas',
  'Indo Premier',
  'Phillip Securities',
  'Trimegah Sekuritas',
];
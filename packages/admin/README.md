# Psychology Portal Admin Dashboard

A modern admin dashboard for the Psychology Portal built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Analytics Dashboard** with page views, user statistics, and engagement metrics
- 📈 **Interactive Charts** using Recharts for data visualization
- 🎨 **Modern UI** with Tailwind CSS and responsive design
- 🔄 **Real-time Updates** with React Query for data fetching
- 🗂️ **State Management** with Zustand for application state
- 📱 **Responsive Design** optimized for desktop and mobile

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Query** for data fetching and caching
- **Zustand** for state management
- **Lucide React** for icons
- **date-fns** for date formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your API endpoint:
```env
VITE_API_URL=http://localhost:3003
```

4. Start the development server:
```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── StatisticsCard.tsx
│   ├── PageViewChart.tsx
│   ├── HourlyChart.tsx
│   └── TopPagesTable.tsx
├── hooks/              # Custom React hooks
│   └── useAnalytics.ts
├── pages/              # Page components
│   └── Dashboard.tsx
├── services/           # API services
│   └── analyticsApi.ts
├── store/              # Zustand stores
│   └── useAnalyticsStore.ts
├── types/              # TypeScript types
│   └── analytics.ts
├── App.tsx             # Main App component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Analytics Features

### Dashboard Overview
- Total page views
- Unique users count
- Average session duration
- Bounce rate statistics

### Charts & Visualizations
- Daily page views trend
- Hourly activity patterns
- Top pages table
- Views vs unique users comparison

### Real-time Updates
- Data refreshes every 30 seconds
- Loading states and error handling
- Responsive design for all screen sizes

## API Integration

The dashboard connects to the analytics service API with the following endpoints:

- `GET /api/analytics/stats` - Overall statistics
- `GET /api/analytics/pageviews` - Page view data
- `GET /api/analytics/daily` - Daily aggregated data
- `GET /api/analytics/hourly` - Hourly activity data

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Analytics API base URL | `http://localhost:3003` |

## Development

### Adding New Charts

1. Create a new component in `src/components/`
2. Add necessary props and TypeScript types
3. Implement loading and error states
4. Add the component to the Dashboard page

### Customizing Styles

The project uses Tailwind CSS with custom theme configuration. Update `tailwind.config.js` to modify colors, spacing, and other design tokens.

## Production Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains the production-ready files

3. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Psychology Portal application. 
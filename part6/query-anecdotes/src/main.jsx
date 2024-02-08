import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CounterContextProvider } from './components/CounterContext'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </CounterContextProvider>
)

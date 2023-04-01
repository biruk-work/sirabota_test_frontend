import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import store from './store'
import { theme } from './theme'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
)

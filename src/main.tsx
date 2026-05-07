import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "./context/AuthProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GoogleOAuthProvider} from '@react-oauth/google';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="928587617106-acsepflblcakn2tlhun53rkunvej61n8.apps.googleusercontent.com">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </StrictMode>,
)

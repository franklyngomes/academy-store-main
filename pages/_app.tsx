import Wrapper from "@/layout/wrapper/Wrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({})
  return (
    <QueryClientProvider client={queryClient}>
    <Wrapper>
      <Toaster/>
      <Component {...pageProps} />
    </Wrapper>
    </QueryClientProvider>
  )
}

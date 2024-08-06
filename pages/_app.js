import Wrapper from "@/Layout/Wrapper";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {

  // Create Query Client For React Query
  const queryClient = new QueryClient()

  return (
    <>

      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Wrapper>
            <Component>
              {pageProps}
            </Component>
          </Wrapper>
        </Provider>
      </QueryClientProvider>

    </>
  )


}

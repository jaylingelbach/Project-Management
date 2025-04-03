// App.js
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ClerkProvider } from '@clerk/clerk-react';
import Client from './pages/Client';
import Header from "./components/Header";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import "@liveblocks/react-ui/styles.css";
import 'react-toastify/dist/ReactToastify.css';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: { merge(existing, incoming) { return incoming; } },
        projects: { merge(existing, incoming) { return incoming; } }
      }
    }
  }
}); 

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? process.env.REACT_APP_APOLLO_URI : process.env.REACT_APP_PROD_APOLLO_URI,
  cache
});

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <LiveblocksProvider
      publicApiKey={process.env.REACT_APP_LIVEBLOCKS_PUBLIC_KEY}
      authEndpoint={async (room) => {
        const response = await fetch("http://localhost:8000/api/liveblocks-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ room }),
        });
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        const data = await response.json();
        return data;
      }}
    >
      <ApolloProvider client={client}>
        <Router>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <Header />
            <div className="container">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects/:id' element={<Project />} />
                <Route path='/clients/:id' element={<Client />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
            <ToastContainer />
          </ClerkProvider>
        </Router>
      </ApolloProvider>
    </LiveblocksProvider>
  );
}

export default App;

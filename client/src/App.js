import { ApolloClient, ApolloProvider, InMemoryCache  } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Client from './pages/Client';
import Header from "./components/Header";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          } 
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
}); 

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? process.env.REACT_APP_APOLLO_URI : process.env.REACT_APP_PROD_APOLLO_URI,
  cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
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
      </Router>
    </ApolloProvider>
  );
}

export default App;

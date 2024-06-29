import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountriesOverview from './components/CountriesOverview/CountriesOverview';
import CountryDetails from './components/CountryDetails/CountryDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountriesOverview />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import List from './List';
import Form from './Form';

function UserPage() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/addnew" element={<Form />} />
        <Route path="/edit/:id" element={<Form />} />
      </Routes>
    </Suspense>
  );
}

export default UserPage;

import React, { useContext } from 'react';
import BookList from './BookList';
import useFirestore from '../hooks/useFireStore';
import { AuthContext } from '../context/AuthContext';

export default function BookLists () {

  let { getCollection } = useFirestore();

  let { user } = useContext(AuthContext);

  let { data : books, error, loading } = getCollection("books", ["uid", "==", user.uid]);
  
  return (
    <>
        {error && <p className={`text-center text-2xl font-bold text-gray-700 mt-5`}>{error}</p>}
        {!error && loading && <p className={`text-center text-2xl font-bold text-gray-700 mt-5`}>Loading...</p>}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-5'>
            {books && books.map(book => (
              <BookList key={book.id} book={book} />
            ))}
        </div>
        {!error && books && books.length < 1 && <p className={`text-center text-2xl font-bold text-gray-700`}>No Records Found.</p>}
    </>
  )
}

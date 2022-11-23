import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

const SearchBooks = ({ username, books }) => {
  if (!books || !books.length) {
    return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map(friend => (
        <button className="btn w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default SearchBooks;

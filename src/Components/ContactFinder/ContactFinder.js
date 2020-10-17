import React from 'react';
import './ContactFinder.css';

export default function ContactFinder({ value, onChangeFilter }) {
  return (
    <label className="ContactFinder">
      Find contacts by name
      <input
        type="text"
        className="ContactFinder-input"
        value={value}
        onChange={onChangeFilter}
      />
    </label>
  );
}

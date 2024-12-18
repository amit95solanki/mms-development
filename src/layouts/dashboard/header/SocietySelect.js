import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'Society 1', label: 'Society 1' },
  { value: 'Society 2', label: 'Society 2' },
  { value: 'Society 3', label: 'Society 3' },
];

const SocietySelect = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log('Selected option:', selectedOption);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#aaa',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#fff', // Background for the dropdown menu
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'white' : 'black', // Text color: white for selected, black otherwise
      backgroundColor: state.isSelected ? '#007BFF' : '#fff', // Background for selected option
      '&:hover': {
        backgroundColor: '#f0f0f0', // Hover background
      },
    }),
  };

  return (
    <div
      style={{
        width: '200px',
      }}
    >
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select Society"
        styles={customStyles}
        isClearable
      />
    </div>
  );
};

export default SocietySelect;

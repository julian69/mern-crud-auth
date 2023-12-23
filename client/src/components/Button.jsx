export const Button = ({ value, type, onClick }) => (
  <button
    type={type || 'submit'}
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
    {value}
  </button>
);


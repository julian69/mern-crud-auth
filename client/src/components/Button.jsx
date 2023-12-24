export const Button = ({ value, type, onClick }) => (
  <button
    type={type || 'submit'}
    onClick={onClick}
    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-2 rounded-sm">
    {value}
  </button>
);


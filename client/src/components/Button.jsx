export const Button = ({ value, type }) => (
  <button
    type={type || 'submit'}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
    {value}
  </button>
);


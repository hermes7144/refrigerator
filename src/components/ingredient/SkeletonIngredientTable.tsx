const SkeletonIngredientTable = () => {
  const skeletonRows = Array.from({ length: 15 });

  return (
    <div className='flex justify-center'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 w-1/2 text-center'>Ingredient</th>
            <th className='px-4 py-2 w-1/6 text-center'>Qty</th>
            <th className='px-4 py-2 w-2/6 text-center'>Expiration</th>
            <th className='px-4 py-2 w-2/6 text-center'></th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index} className='h-12'>
              <td className='flex items-center h-12 gap-1'>
                <div className='skeleton h-8 w-8'></div>
                <div className='skeleton h-8 w-full'></div>
              </td>
              <td>
                <div className='skeleton h-8 w-full'></div>
              </td>
              <td>
                <div className='skeleton h-8 w-full'></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonIngredientTable;

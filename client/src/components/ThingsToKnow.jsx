import { thingsToKnow } from './constants.jsx';

const ThingsToKnow = () => {
  const thingsToKnowContent = (
    <div className='grid grid-cols-3 '>
      {thingsToKnow.map((item) => (
        <div key={item.title}>
          <h4 className='font-semibold text-lg pb-2'>{item.title}</h4>
          {item.content.map((itemContent) => (
            <div
              key={itemContent.name}
              className='flex items-center gap-2 pb-3'
            >
              {itemContent?.icon}
              <p>{itemContent.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className='py-5 w-full px-20'>
      <h3 className='text-2xl pb-3 font-semibold'>Things to know</h3>
      {thingsToKnowContent}
    </div>
  );
};

export default ThingsToKnow;
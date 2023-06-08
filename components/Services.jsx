import React , {useState} from 'react';

const Services = ({
  setOpenProfile,
  setCompleteModel,
  setGetModel,
  setStartModal
}) => {
  const servicesData = [
    {
      title: '1',
      description: 'توضیحات خدمت ۱',
    },
    {
      title: '2',
      description: 'جزییات محصول',
    },
    {
      title: '3',
      description: 'شروع حرکت محصول',
    },
    {
      title: '4',
      description: 'توضیحات خدمت ۴',
    },
    {
      title: '5',
      description: 'توضیحات خدمت ۵',
    },
    {
      title: '6',
      description: 'توضیحات خدمت ۶',
    },
  ];

  const openModelBox = text => {
    if (text === 1){
      setCompleteModel(true);
    }else if (text === 2){
      setGetModel(true);
    }else if (text === 3){
      setStartModal(true);
    }else if(text === 4){
      setOpenProfile(true);
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-white shadow-md flex items-center justify-center cursor-pointer"
              onClick={() => openModelBox(index + 1)}
            >
              <p className="text-center text-6xl font-bold">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

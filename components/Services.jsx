import React from 'react';

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

  const openModelBox = (index) => {
    switch (index) {
      case 0:
        setCompleteModel(true);
        break;
      case 1:
        setGetModel(true);
        break;
      case 2:
        setStartModal(true);
        break;
      case 3:
        setOpenProfile(true);
        break;
      default:
        console.log("from Services: Please Select True Option");
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-white shadow-md flex items-center justify-center cursor-pointer"
              onClick={() => openModelBox(index)}
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

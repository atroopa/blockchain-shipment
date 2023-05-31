import React from 'react';

const Services = () => {
  const services = [
    {
      title: 'عنوان کارت ۱',
      description: 'توضیحات کارت ۱',
    },
    {
      title: 'عنوان کارت ۲',
      description: 'توضیحات کارت ۲',
    },
    {
      title: 'عنوان کارت ۳',
      description: 'توضیحات کارت ۳',
    },
    {
      title: 'عنوان کارت ۴',
      description: 'توضیحات کارت ۴',
    },
    {
      title: 'عنوان کارت ۵',
      description: 'توضیحات کارت ۵',
    },
    {
      title: 'عنوان کارت ۶',
      description: 'توضیحات کارت ۶',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {services.map((service, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{service.title}</h2>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;

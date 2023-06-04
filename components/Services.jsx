import React from 'react';

const servicesData = [
  {
    title: 'خدمت ۱',
    description: 'توضیحات خدمت ۱',
  },
  {
    title: 'getShipment',
    description: 'getShipment',
  },
  {
    title: 'خدمت ۳',
    description: 'توضیحات خدمت ۳',
  },
  {
    title: 'خدمت ۴',
    description: 'توضیحات خدمت ۴',
  },
  {
    title: 'خدمت ۵',
    description: 'توضیحات خدمت ۵',
  },
  {
    title: 'خدمت ۶',
    description: 'توضیحات خدمت ۶',
  },
];

const Services = ({
  setOpenProfile,
  setCompeleteModel,
  setGetModel,
  startModal
}) => {
  return (
    <section className="py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-white shadow-md flex items-center justify-center"
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
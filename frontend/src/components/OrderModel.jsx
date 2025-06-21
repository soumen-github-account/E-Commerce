import React, { useContext } from 'react'
const OrderModel = ({orders, index, data}) => {
    const date = new Date(data.date); //orders[index].date
    const deliveryDate = data.items[0].deliveryDate // new Date(data.deliveryDate); //orders[index].deliveryDate

   
    const steps = [
  {
    title: 'Order Confirmed',
    date: date.toLocaleDateString('en-IN', {day: '2-digit',month: 'long',year: 'numeric'}),
    details: [
      { message: 'Your Order has been placed.', time: 'Sun, 2nd Feb \'25 - 9:02pm' },
      { message: 'Seller has processed your order.', time: 'Mon, 3rd Feb \'25 - 8:48am' },
      { message: 'Your item has been picked up by delivery partner.', time: 'Tue, 4th Feb \'25 - 7:37am' }
    ],
  },
  {
    title: 'Shipped',
    date: '',
    details: [
      { message: 'Ekart Logistics - FMPC4500262320', time: 'Your item has been shipped.' },
      { message: 'Your item has been received in the hub nearest to you', time: '' }
    ]
  },
  {
    title: 'Out For Delivery',
    date: '',
    details: [
      { message: 'Your item is out for delivery', time: 'Wed, 5th Feb \'25 - 10:17am' }
    ]
  },
  {
    title: 'Delivered',
    date:  `${deliveryDate}`,//.toLocaleDateString('en-IN', {day: '2-digit',month: 'long',year: 'numeric'}),
    details: [
      { message: 'Your item has been delivered', time: 'Wed, 5th Feb \'25 - 10:22pm' }
    ]
  }
];

const currentStatus = data.orderStatus;

const getStatusIndex = () => {
    return steps.findIndex(step => step.title === currentStatus);
  };

  const currentIndex = getStatusIndex();
  return (
    // <div className="max-w-xl mx-auto p-6 font-sans">
    //         <div className="relative border-l-2 border-green-500 pl-6" style={{ height: `${(currentIndex / (steps.length - 1)) * 100}%` }} >
    //             {steps.map((step, index) => (
    //             <div key={index} className="mb-10 relative">
    //                 <div className="absolute -left-8 top-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
    //                 <h3 className="font-semibold text-lg text-gray-800">{step.title} <span className="text-gray-500 text-sm">{step.date}</span></h3>
    //                 <ul className="mt-2 space-y-1 text-sm text-gray-600">
    //                 {step.details.map((detail, i) => (
    //                     <li key={i}>
    //                     <div>{detail.message}</div>
    //                     {detail.time && <div className="text-xs text-gray-400">{detail.time}</div>}
    //                     </li>
    //                 ))}
    //                 </ul>
    //             </div>
    //             ))}
    //         </div>
    //     </div>

    <div className="max-w-xl mx-auto p-6 font-sans relative my-3">
      <div className="absolute left-4 top-5 bottom-0 w-1 bg-gray-300 rounded-full z-0" />
      <div className="absolute left-4 top-5 w-1 bg-green-500 z-10 rounded-full"
           style={{ height: `${(currentIndex / (steps.length - 1)) * 100}%` }} />

      <div className="relative border-l-2 border-transparent pl-10">
            {steps.map((step, index) => (
                <div key={index} className="mb-10 relative">
                    <div className={`absolute -left-[55.5px] top-1 w-4 h-4 rounded-full border-2 border-white ${index <= currentIndex ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <h3 className="font-semibold text-lg text-gray-800">{step.title} <span className="text-gray-500 text-sm">{step.date}</span></h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    {step.details.map((detail, i) => (
                        <li key={i}>
                        <div>{detail.message}</div>
                        {detail.time && <div className="text-xs text-gray-400">{detail.time}</div>}
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
          </div>

      </div>
  )
}

export default OrderModel

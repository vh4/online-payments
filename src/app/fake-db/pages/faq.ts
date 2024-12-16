// Type Imports
import type { FaqType } from '@/types/pages/faqTypes'

export const db: FaqType[] = [
  {
    id: 'pln',
    title: 'PLN Payment',
    icon: 'ri-questionnaire-fill',
    subtitle: 'Get help with pln payment',
    questionsAnswers: [
      {
        id: 'order-payment',
        question: 'When is payment taken for my order?',
        answer:
          'Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.'
      },
      {
        id: 'order',
        question: 'How do I pay for my order?',
        answer:
          'We accept Visa®, MasterCard®, American Express®, and PayPal®. Our servers encrypt all information submitted to them, so you can be confident that your credit card information will be kept safe and secure.'
      },
      {
        id: 'placing-order',
        question: "What should I do if I'm having trouble placing an order?",
        answer:
          'For any technical difficulties you are experiencing with our website, please contact us at our support portal, or you can call us toll-free at 1-000-000-000, or email us at order@companymail.com'
      },
      {
        id: 'users-license',
        question: 'Which license do I need for an end product that is only accessible to paying users?',
        answer:
          'If you have paying users or you are developing any SaaS products then you need an Extended License. For each products, you need a license. You can get free lifetime updates as well.'
      },
      {
        id: 'subscription-review',
        question: 'Does my subscription automatically renew?',
        answer:
          'No, This is not subscription based item.Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps.'
      }
    ]
  }
]

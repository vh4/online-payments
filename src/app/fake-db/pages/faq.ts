// Type Imports
import type { FaqType } from '@/types/pages/faqTypes'

export const PLNGuide: FaqType[] = [
  {
    id: 'pln',
    title: 'PLN Payment',
    icon: 'ri-questionnaire-fill',
    subtitle: 'Get help with PLN payment',
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
          'Before proceeding with the payment, ensure you have sufficient balance in your account. If your balance is insufficient, you need to deposit funds first using methods like bank transfer, e-wallets (e.g., OVO, GoPay, Dana), or credit/debit card. Once your balance is sufficient, you can proceed to checkout and complete your payment.'
      },
      {
        id: 'placing-order',
        question: "What should I do if I'm having trouble placing an order?",
        answer:
          'For any technical difficulties you are experiencing with our website, please contact us at our support portal, or you can call us via email us at admin@rajabiller.com.'
      },
      {
        id: 'users-license',
        question: 'Which license do I need for an end product that is only accessible to paying users?',
        answer:
          'If you have paying users or you are developing any SaaS products, you need an Extended License. For each product, you need a license. You can get free lifetime updates as well.'
      },
      {
        id: 'subscription-review',
        question: 'Does my subscription automatically renew?',
        answer:
          'No, this is not a subscription-based item. Payments are processed individually and do not renew automatically.'
      }
    ]
  }
]

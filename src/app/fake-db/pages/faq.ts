// Type Imports
import type { FaqType } from '@/types/pages/faqTypes'

export const PLNGuide: FaqType[] = [
  {
    id: 'pln',
    title: 'PLN Payment',
    icon: 'ri-questionnaire-fill',
    subtitle: 'Dapatkan bantuan untuk pembayaran PLN',
    questionsAnswers: [
      {
        id: 'order-payment',
        question: 'Kapan pembayaran untuk pesanan saya dilakukan?',
        answer:
          'Pembayaran dilakukan selama proses checkout saat Anda membayar pesanan Anda. Nomor pesanan yang muncul di layar konfirmasi menunjukkan bahwa pembayaran telah berhasil diproses.'
      },
      {
        id: 'order',
        question: 'Bagaimana cara membayar pesanan saya?',
        answer:
          'Sebelum melanjutkan pembayaran, pastikan saldo di akun Anda mencukupi. Jika saldo Anda tidak mencukupi, Anda perlu mengisi saldo terlebih dahulu menggunakan metode seperti transfer bank, e-wallet (misalnya, OVO, GoPay, Dana), atau kartu kredit/debit. Setelah saldo Anda mencukupi, Anda dapat melanjutkan ke proses checkout dan menyelesaikan pembayaran.'
      },
      {
        id: 'placing-order',
        question: 'Apa yang harus saya lakukan jika mengalami kesulitan saat melakukan pemesanan?',
        answer:
          'Jika Anda mengalami kesulitan teknis dengan situs web kami, silakan hubungi kami melalui portal dukungan kami, atau Anda dapat mengirimkan email ke admin@rajabiller.com.'
      },
      {
        id: 'users-license',
        question: 'Lisensi apa yang saya butuhkan untuk produk akhir yang hanya dapat diakses oleh pengguna berbayar?',
        answer:
          'Jika Anda memiliki pengguna berbayar atau sedang mengembangkan produk SaaS apa pun, Anda memerlukan Lisensi Diperluas. Untuk setiap produk, Anda memerlukan lisensi. Anda juga bisa mendapatkan pembaruan gratis seumur hidup.'
      },
      {
        id: 'subscription-review',
        question: 'Apakah langganan saya akan diperpanjang secara otomatis?',
        answer:
          'Tidak, ini bukan item berbasis langganan. Pembayaran dilakukan secara individu dan tidak diperpanjang secara otomatis.'
      }
    ]
  }
]

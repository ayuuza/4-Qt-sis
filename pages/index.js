import Head from 'next/head'
import CardMaker from '../components/CardMaker'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bhai Dooj — Card Maker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen flex items-start justify-center py-12">
        <CardMaker />
      </main>
    </>
  )
}

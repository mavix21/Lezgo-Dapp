import { Header } from '@/components/layout/header/Header';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Hero } from '@/components/layout/Hero';

export default function HomePage() {
  return (
    <div className="nice-gradient | min-h-svh relative z-0">
      <div className="grain"></div>
      <div className="h-full w-full blur-3xl absolute m-auto backdrop-brightness-75 mix-blend-exclusion -z-10" />
      <Header />
      <Hero />
      <section className="mt-16 px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl font-bold">
            Eventos recomendados
          </h2>
          <a href="#" className="text-blue-500">
            Ver todo
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Card className="overflow-hidden">
            <Image
              src="/images/card1.png"
              width={450}
              height={450}
              alt="Picture of the author"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">John Digweed @ Arena 1</h3>
              <p className="text-sm text-gray-600">Julio 13 - 22:00 hrs</p>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <Image
              src="/images/card2.png"
              width={450}
              height={450}
              alt="Picture of the author"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">
                James Zabiela @ Lima Polo Club
              </h3>
              <p className="text-sm text-gray-600">Julio 20 - 22:00 hrs</p>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <Image
              src="/images/card3.png"
              width={450}
              height={450}
              alt="Picture of the author"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">
                Brutalismus3000 @ Green Arena
              </h3>
              <p className="text-sm text-gray-600">Julio 29 - 22:00 hrs</p>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <Image
              src="/images/card4.png"
              width={450}
              height={450}
              alt="Picture of the author"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Solomun @ Lima Polo Club</h3>
              <p className="text-sm text-gray-600">Septiembre 14 - 22:00 hrs</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative">
      <Image
        width={1920}
        height={1280}
        src="/hero-large.jpg"
        alt="Event Banner"
        className="object-cover min-h-[720px]"
        priority
      />

      <div className="absolute inset-0 -top-1/4 flex flex-col items-center justify-center text-center bg-black bg-opacity-60">
        <h1 className="text-7xl text-primary font-bold">NEON FEST</h1>
        <h2 className="text-2xl">ELECTRONIC MUSIC FESTIVAL</h2>
        <p className="mt-4">Join us for an unforgettable experience</p>
        <div className="flex space-x-4 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">20</span>
            <span>Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">16</span>
            <span>Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">54</span>
            <span>Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">32</span>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}

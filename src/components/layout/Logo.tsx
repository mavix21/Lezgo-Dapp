import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/images/brand.png"
      className="brand-logo | filter-white"
      width={96}
      height={45}
      alt="Picture of the author"
      priority
    />
  );
}

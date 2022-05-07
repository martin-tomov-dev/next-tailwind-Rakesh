import Image from "next/image";

export default function SocialIcon({
  imgSrc,
  altText,
  height = 50,
  width = 50,
}) {
  return (
    <a href="">
      <Image
        alt={`${altText}`}
        height={height}
        src={`${imgSrc}`}
        width={width}
      />
    </a>
  );
}

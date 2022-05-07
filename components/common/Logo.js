import Link from "next/link";
import Image from "next/image";

export default function Logo({ height = "100%", width = "100%" }) {
  return (
    <Link href="/profile" className="h-full" passHref>
      <div style={{ width: "100%", height: "auto" }}>
        <Image
          alt="Logo"
          src="/images/logo.svg"
          className="h-full"
          height={height}
          width={width}
          layout="responsive"
        />
      </div>
    </Link>
  );
}

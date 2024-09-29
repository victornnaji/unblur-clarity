import Image from "next/image";
import Link from "next/link";
import React from "react";
import unblurLogo from "@/assets/unblur-photos.png";
import { links } from "@/config";

const BrandLogo = () => {
  return (
    <Link
      href={links.home.path}
      className="block relative w-24 text-4xl font-bold h-9"
    >
      <Image
        src={unblurLogo}
        alt="unblur photo logo"
        fill
        priority
        sizes="h-auto w-auto"
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
};

export default BrandLogo;

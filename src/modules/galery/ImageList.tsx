"use client";
import Container from "@/components/shared/Container";
import Image from "next/image";
import { useEffect, useState } from "react";
import PhotoGalery from "@/modules/galery/components/PhotoGalery";
import type { GalleryImage } from "@/lib/api";

type Props = {
  images: GalleryImage[];
};

const ImageList = ({ images }: Props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Container>
      <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image, i) => (
          <div
            key={image.id}
            className="cursor-pointer overflow-hidden rounded-lg max-h-100"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image
              src={image.src}
              alt="Qalereya şəkli"
              width={400}
              height={300}
              className="object-cover object-center w-full hover:scale-105 transition-transform duration-200"
            />
          </div>
        ))}
      </div>
      <PhotoGalery
        open={open}
        setOpen={setOpen}
        index={index}
        slides={images}
      />
    </Container>
  );
};

export default ImageList;

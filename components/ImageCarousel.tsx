"use client";

import { ProductImage } from "@/interfaces/PrintifyTypes";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function ImagesCarousel(props: { images: ProductImage[] }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const { images } = props;

    return (
        <Carousel className="flex w-full">
            <CarouselContent className="">
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div
                            className={
                                imageLoaded
                                    ? ""
                                    : "flex aspect-square animate-pulse bg-muted"
                            }
                        >
                            <Card>
                                <CardContent className="p-0">
                                    <Image
                                        src={image.src}
                                        alt="Product Image"
                                        width={1200}
                                        height={1200}
                                        priority
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="invisible bg-zinc-600 text-white outline-none md:visible" />
            <CarouselNext className="invisible bg-zinc-600 text-white outline-none md:visible" />
        </Carousel>
    );
}

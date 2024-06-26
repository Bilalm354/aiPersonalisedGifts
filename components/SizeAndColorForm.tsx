"use client";
import { Options } from "./ProductDetails";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const SizeAndColorSelector = ({
    sizes,
    colours,
    selectedSizeId,
    selectedColorId,
    setSelectedSizeId,
    setSelectedColorId,
}: {
    sizes: Options[];
    colours: Options[];
    selectedSizeId: string;
    selectedColorId: string;
    setSelectedSizeId: (sizeId: string) => void;
    setSelectedColorId: (colorId: string) => void;
}) => {
    function onSizeChange(value: string) {
        setSelectedSizeId(value);
    }

    function onColorChange(value: string) {
        setSelectedColorId(value);
    }

    return (
        <div
            id="selectContainer"
            className="dark flex w-full flex-col items-center space-y-2"
        >
            <Select
                onValueChange={(value) => onSizeChange(value)}
                value={selectedSizeId}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                    {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id.toString()}>
                            {size.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => onColorChange(value)}
                value={selectedColorId}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                    {colours.map((colour) => (
                        <SelectItem
                            key={colour.id}
                            value={colour.id.toString()}
                        >
                            {colour.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

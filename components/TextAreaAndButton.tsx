/* eslint-disable react/no-unescaped-entities */
"use client";
import { ChangeEvent, useState, KeyboardEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { envClient } from "@/lib/env/client";

const FormSchema = z.object({
    modelProvider: z.string().default("openai"),
});

export function TextAreaAndButton() {
    const initalPrompt =
        envClient.NEXT_PUBLIC_ENV === "development" ? "test" : "";
    const [prompt, setPrompt] = useState<string>(initalPrompt);
    const [modelProvider, setModelProvider] = useState<string>("openai");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const submitGenerateText = async () => {
        if (prompt.trim() === "") return;

        router.push(`/image/${prompt}?model=${modelProvider}`);
    };

    const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitGenerateText();
            textAreaRef.current?.blur();
        }
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <>
            <div
                className="flex w-5/6 flex-col items-center space-y-4 lg:w-1/2"
                id="form-container"
            >
                <label htmlFor="prompt" className="text-lg">
                    Enter your prompt
                </label>
                <Form {...form}>
                    <form className="w-2/3 space-y-6 text-black">
                        <FormField
                            control={form.control}
                            name="modelProvider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <Select
                                        onValueChange={(e) => {
                                            setModelProvider(e);
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select model" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="openai">
                                                OpenAI/dall-e-3
                                            </SelectItem>
                                            <SelectItem value="stable-diffusion">
                                                Stability-ai/stable-diffusion
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Textarea
                    ref={textAreaRef}
                    placeholder="Enter your prompt here!"
                    value={prompt}
                    onChange={onInputChanged}
                    className="h-48 resize-none rounded-lg bg-slate-600 p-4 text-white placeholder:text-white/50"
                    onKeyDown={onKeyDown}
                    autoFocus
                />
                <Button
                    onClick={submitGenerateText}
                    data-testid="Generate Image Button"
                >
                    Generate Image
                </Button>

                <div className="instructions">
                    <h2 className="mb-2 text-lg font-bold">How It Works:</h2>
                    <ol className="list-inside list-decimal space-y-2 text-sm md:text-lg">
                        <li>
                            <strong>Enter Your Prompt:</strong> Type your idea
                            or description into the text box.
                        </li>
                        <li>
                            <strong>Generate Your Image:</strong> Click
                            'Generate Image'. AI will create an image based on
                            your prompt.
                        </li>
                        <li>
                            <strong>Choose Your Product:</strong> Select a
                            T-shirt, mug, or hoodie to see your design on it.
                        </li>
                        <li>
                            <strong>Purchase:</strong> Click 'Buy Now' and enter
                            your details to complete the purchase with Stripe.
                        </li>
                        <li>
                            <strong>Enjoy:</strong> Your custom item will be
                            printed and shipped to you. Enjoy or gift it!
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}

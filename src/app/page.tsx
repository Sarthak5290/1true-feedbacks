"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

export default function Home() {
  const messages = [
    {
      username: "User123",
      message: "Hey, how are you doing today?",
      time: "10 minutes ago",
    },
    {
      username: "SecretAdmirer",
      message: "I really liked your recent post!",
      time: "2 hours ago",
    },
    {
      username: "CuriousMind",
      message: "Your insights always brighten my day. Keep it up!",
      time: "1 day ago",
    },
  ];

  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement!, // Updated type
  };

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay(autoplayOptions),
  ]);

  // If you don't use `emblaApi`, you can safely remove it:
  // const [, emblaApi] = useEmblaCarousel(...);

  return (
    <div className="min-h-max bg-gradient-to-b  flex flex-col items-center justify-center py-16">
      <div className="max-w-4xl w-full px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 animate-fade-in">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          True Feedback - Where your identity remains a secret.
        </p>

        <div className="relative w-full max-w-3xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 pl-4 transition-transform duration-300"
                >
                  <Card className="transform hover:scale-105 transition-all duration-300 bg-white rounded-xl shadow-xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {msg.username.charAt(0)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-xl text-gray-800">
                            {msg.username}
                          </h3>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {msg.message}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="inline-block">{msg.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

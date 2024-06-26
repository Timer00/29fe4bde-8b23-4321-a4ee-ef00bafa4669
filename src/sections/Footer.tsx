import Link from 'next/link'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { TextField } from '@/components/common/Fields'
import { type LinkFormat, NavLinks } from '@/components/common/NavLinks'
import React from "react";
import ImageRenderer from "@/components/common/ImageRenderer";

export interface FooterData {
  name: string;
  logomarkIcon: string;
  logoText: string;
  logoDescription: string;
  navLinks: LinkFormat[];
  qrCode: {
    icon: string;
    borderIcon: string;
    alt: string;
    text: string;
    description: string;
  };
  newsletter: {
    placeholder: string;
    buttonText: string;
    buttonTextMobile: string;
  };
  copyright: string;
}

export function Footer({ data }: { data: FooterData }) {
  const {
    logomarkIcon,
    logoText,
    logoDescription,
    navLinks,
    qrCode,
    newsletter,
    copyright,
  } = data;

  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div
          className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <ImageRenderer name={logomarkIcon} index={logomarkIcon} className="h-10 w-10 flex-none fill-cyan-500" />
              <div className="ml-4">
                <p className="text-base font-semibold">{logoText}</p>
                <p className="mt-1 text-sm">{logoDescription}</p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks links={navLinks} />
            </nav>
          </div>
          <div
            className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <ImageRenderer index={qrCode.borderIcon} name={qrCode.borderIcon}
                             className="absolute inset-0 h-full w-full stroke-gray-300 transition-colors group-hover:stroke-cyan-500" />
              <ImageRenderer index={qrCode.icon} name={qrCode.icon} alt={qrCode.alt} />
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-gray-900">
                <Link href="#">
                  <span className="absolute inset-0 sm:rounded-2xl" />
                  {qrCode.text}
                </Link>
              </p>
              <p className="mt-1 text-sm text-gray-700">{qrCode.description}</p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <form className="flex w-full justify-center md:w-auto">
            <TextField
              type="email"
              aria-label="Email address"
              placeholder={newsletter.placeholder}
              autoComplete="email"
              required
              className="w-60 min-w-0 shrink"
            />
            <Button type="submit" color="cyan" className="ml-4 flex-none">
              <span className="hidden lg:inline">{newsletter.buttonText}</span>
              <span className="lg:hidden">{newsletter.buttonTextMobile}</span>
            </Button>
          </form>
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. {copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}

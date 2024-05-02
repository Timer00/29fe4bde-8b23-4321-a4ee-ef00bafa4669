'use client'

import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { type LinkFormat, NavLinks } from '@/components/NavLinks'
import React from "react";
import { ChevronUpIcon, MenuIcon } from "@/images/icons/icons";
import ImageRenderer from "@/components/ImageRenderer";
import FlyoutMenu from "@/components/FlyoutMenu";
import StackedLayout from "@/components/StackedLayout";
import { type Country } from "@/interfaces/countries";

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    />
  )
}

export interface HeaderData {
  name: string;
  logoIcon: string;
  navLinks: LinkFormat[];
  //TODO: Ensure both are following same format.
  mobileNavLinks: {
    href: string;
    label: string;
  }[];
  loginText: string;
  downloadText: string;
}

interface HeaderProps {
  data: HeaderData;
  countries: Country[]
}

export function Header({ data, countries }: HeaderProps) {
  const { logoIcon, navLinks, mobileNavLinks, loginText, downloadText } = data;

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/public" aria-label="Home">
              <ImageRenderer name={logoIcon} className="h-10 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks links={navLinks} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            {mobileNavLinks.map((link) => (
                              <MobileNavLink key={link.href} href={link.href}>
                                {link.label}
                              </MobileNavLink>
                            ))}
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <Button href="/login" variant="outline">
                              {loginText}
                            </Button>
                            <Button href="#">{downloadText}</Button>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            <FlyoutMenu>
              <StackedLayout tabs={['Europe', 'America', 'Oceania', 'Asia', 'Africa', 'Global']}>
                {!countries ?
                  'Unable to get list of countries.'
                  :
                  countries.map((country, i) => (
                    <div key={i} className="w-1/3 flex items-center space-x-2 bg-gray-50 text-gray-600">
                      <ImageRenderer className="w-6 h-4 rounded" name={country["alpha-2"]} />
                      <span>{country.name}</span>
                    </div>
                  ))
                }
              </StackedLayout>
            </FlyoutMenu>
            <Button href="/login" variant="outline" className="hidden lg:block">
              {loginText}
            </Button>
            <Button href="#" className="hidden lg:block">
              {downloadText}
            </Button>
          </div>
        </Container>
      </nav>
    </header>
  );
}

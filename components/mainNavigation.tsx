'use client';
import { cn } from '@/lib/utils'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

const MainNavigation = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.galleryId}`,
      label: 'Overview',
      active: pathName === `/${params.galleryId}`,
    },
    {
      href: `/${params.galleryId}/tags`,
      label: 'Tags',
      active: pathName === `/${params.galleryId}/tags`,
    },
    {
      href: `/${params.galleryId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.galleryId}/settings`,
    },
  ];

  return (
    <nav 
     className={cn('flex items-center space-x-4 lg:space-x-6', className)}
    >
      {
        routes.map((route) => (
          <Link href={route.href} key={route.label}
            className={cn('text-sm font-medium transition-colors hover:text-primary', route.active ? "text-black dark:text-white" : "text-muted-foreground")}
          >
            {route.label}
          </Link>
        ))
      }
    </nav>
  )
}

export default MainNavigation
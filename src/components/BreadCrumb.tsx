import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

interface BreadCrumbProps {
  pageName: string;
  parentLinks: { href: string; label: string }[];
}

export const BreadCrumb = ({ pageName, parentLinks }: BreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parentLinks.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{pageName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
